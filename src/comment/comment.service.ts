import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from 'src/schema/comment.schema';
import { Post } from 'src/schema/post.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateCommentDto, GetCommentsDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
		@InjectModel(Post.name) private postModel: Model<Post>,
	) {}

	async createComment(
		postId: string,
		user: UserDocument,
		createCommentDto: CreateCommentDto,
	) {
		try {
			// Check if post exists
			const post = await this.postModel.findById(postId);
			if (!post) {
				throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
			}

			// Create comment
			const newComment = new this.commentModel({
				postId: new Types.ObjectId(postId),
				userId: user._id,
				username: user.username,
				userAvatar: user.profile.avatar,
				text: createCommentDto.text,
				parentCommentId: createCommentDto.parentCommentId
					? new Types.ObjectId(createCommentDto.parentCommentId)
					: null,
				mentions: createCommentDto.mentions || [],
			});

			await newComment.save();

			// Update post comment count
			await this.postModel.findByIdAndUpdate(postId, {
				$inc: { 'counts.comments': 1 },
			});

			return newComment;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not create comment',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getCommentsByPostId(postId: string, query: GetCommentsDto) {
		try {
			const { page = 1, limit = 20, parentCommentId } = query;
			const skip = (page - 1) * limit;

			const filter: any = { postId: new Types.ObjectId(postId) };
			if (parentCommentId) {
				filter.parentCommentId = new Types.ObjectId(parentCommentId);
			} else {
				filter.parentCommentId = null; // Get only top-level comments
			}

			const comments = await this.commentModel
				.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.commentModel.countDocuments(filter);

			return {
				comments,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get comments',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getCommentById(commentId: string) {
		try {
			const comment = await this.commentModel.findById(commentId).exec();
			if (!comment) {
				throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
			}
			return comment;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get comment',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateComment(
		commentId: string,
		user: UserDocument,
		updateCommentDto: UpdateCommentDto,
	) {
		try {
			const comment = await this.commentModel.findById(commentId).exec();
			if (!comment) {
				throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
			}

			if (comment.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to update this comment',
					HttpStatus.FORBIDDEN,
				);
			}

			const updatedComment = await this.commentModel
				.findByIdAndUpdate(
					commentId,
					{
						text: updateCommentDto.text,
						mentions: updateCommentDto.mentions,
					},
					{ new: true },
				)
				.exec();

			return updatedComment;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not update comment',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async deleteComment(commentId: string, user: UserDocument) {
		try {
			const comment = await this.commentModel.findById(commentId).exec();
			if (!comment) {
				throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
			}

			if (comment.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to delete this comment',
					HttpStatus.FORBIDDEN,
				);
			}

			// Delete all child comments (replies)
			await this.commentModel
				.deleteMany({ parentCommentId: comment._id })
				.exec();

			// Delete the comment
			await this.commentModel.findByIdAndDelete(commentId).exec();

			// Update post comment count
			await this.postModel.findByIdAndUpdate(comment.postId, {
				$inc: { 'counts.comments': -1 },
			});

			return 'Comment deleted successfully';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not delete comment',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getReplies(commentId: string, query: GetCommentsDto) {
		try {
			const { page = 1, limit = 20 } = query;
			const skip = (page - 1) * limit;

			const replies = await this.commentModel
				.find({ parentCommentId: new Types.ObjectId(commentId) })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.commentModel.countDocuments({
				parentCommentId: new Types.ObjectId(commentId),
			});

			return {
				replies,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get replies',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
