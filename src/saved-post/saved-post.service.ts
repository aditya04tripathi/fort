import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SavedPost } from 'src/schema/saved-post.schema';
import { Post } from 'src/schema/post.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { GetSavedPostsDto, SavePostDto } from './dto';

@Injectable()
export class SavedPostService {
	constructor(
		@InjectModel(SavedPost.name) private savedPostModel: Model<SavedPost>,
		@InjectModel(Post.name) private postModel: Model<Post>,
	) {}

	async savePost(user: UserDocument, savePostDto: SavePostDto) {
		try {
			const { postId, collectionName } = savePostDto;

			// Check if post exists
			const post = await this.postModel.findById(postId);
			if (!post) {
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
			}

			// Check if already saved
			const existingSave = await this.savedPostModel
				.findOne({
					userId: user._id,
					postId: new Types.ObjectId(postId),
				})
				.exec();

			if (existingSave) {
				throw new HttpException('Post already saved', HttpStatus.BAD_REQUEST);
			}

			const savedPost = new this.savedPostModel({
				userId: user._id,
				postId: new Types.ObjectId(postId),
				collectionName: collectionName || 'All Posts',
			});

			await savedPost.save();
			return { message: 'Post saved successfully', savedPost };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not save post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async unsavePost(user: UserDocument, postId: string) {
		try {
			const savedPost = await this.savedPostModel
				.findOneAndDelete({
					userId: user._id,
					postId: new Types.ObjectId(postId),
				})
				.exec();

			if (!savedPost) {
				throw new HttpException('Saved post not found', HttpStatus.NOT_FOUND);
			}

			return { message: 'Post unsaved successfully' };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not unsave post',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getSavedPosts(user: UserDocument, query: GetSavedPostsDto) {
		try {
			const { page = 1, limit = 20, collectionName } = query;
			const skip = (page - 1) * limit;

			const filter: any = { userId: user._id };
			if (collectionName) {
				filter.collectionName = collectionName;
			}

			const savedPosts = await this.savedPostModel
				.find(filter)
				.populate('postId')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.savedPostModel.countDocuments(filter);

			return {
				savedPosts,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get saved posts',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getCollections(user: UserDocument) {
		try {
			const collections = await this.savedPostModel.distinct('collectionName', {
				userId: user._id,
			});

			// Get count for each collection
			const collectionsWithCounts = await Promise.all(
				collections.map(async (name) => {
					const count = await this.savedPostModel.countDocuments({
						userId: user._id,
						collectionName: name,
					});
					return { name, count };
				}),
			);

			return collectionsWithCounts;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get collections',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async checkIfSaved(user: UserDocument, postId: string): Promise<boolean> {
		try {
			const savedPost = await this.savedPostModel
				.findOne({
					userId: user._id,
					postId: new Types.ObjectId(postId),
				})
				.exec();

			return !!savedPost;
		} catch (error) {
			return false;
		}
	}
}
