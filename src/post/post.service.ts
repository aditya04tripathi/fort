import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/post.schema';
import { UserDocument } from 'src/schema/user.schema';
import { CreatePostDto, GetFeedDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
	constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

	async generateFeed(user: UserDocument, query: GetFeedDto) {
		try {
			const { page = 1, limit = 20, userId, hashtag } = query;
			const skip = (page - 1) * limit;

			const filter: any = {};
			if (userId) {
				filter.userId = userId;
			}
			if (hashtag) {
				filter.hashtags = hashtag.toLowerCase();
			}

			const feedPosts = await this.postModel
				.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			return feedPosts;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not generate feed',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async createPost(user: UserDocument, createPostDto: CreatePostDto) {
		try {
			const newPost = new this.postModel({
				...createPostDto,
				userId: user._id,
				userAvatar: user.profile.avatar,
				username: user.username,
			});
			return await newPost.save();
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not create post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getPostById(postId: string, user: UserDocument) {
		try {
			const post = await this.postModel.findById(postId).exec();
			if (!post) {
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
			}
			return post;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updatePost(
		postId: string,
		user: UserDocument,
		updatePostDto: UpdatePostDto,
	) {
		try {
			const post = await this.postModel.findById(postId).exec();
			if (!post) {
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
			}

			if (post.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to update this post',
					HttpStatus.FORBIDDEN,
				);
			}

			const updatedPost = await this.postModel
				.findByIdAndUpdate(postId, updatePostDto, { new: true })
				.exec();

			return updatedPost;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not update post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async deletePost(postId: string, user: UserDocument) {
		try {
			const post = await this.postModel.findById(postId).exec();
			if (!post) {
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
			}

			if (post.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to delete this post',
					HttpStatus.FORBIDDEN,
				);
			}

			await this.postModel.findByIdAndDelete(postId).exec();
			return 'Post deleted successfully';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not delete post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
