import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from 'src/schema/like.schema';
import { Post } from 'src/schema/post.schema';
import { Comment } from 'src/schema/comment.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateLikeDto, GetLikesDto } from './dto';

@Injectable()
export class LikeService {
	constructor(
		@InjectModel(Like.name) private likeModel: Model<Like>,
		@InjectModel(Post.name) private postModel: Model<Post>,
		@InjectModel(Comment.name) private commentModel: Model<Comment>,
	) {}

	async likeTarget(user: UserDocument, createLikeDto: CreateLikeDto) {
		try {
			const { targetType, targetId } = createLikeDto;

			// Check if already liked
			const existingLike = await this.likeModel
				.findOne({
					userId: user._id,
					targetType,
					targetId: new Types.ObjectId(targetId),
				})
				.exec();

			if (existingLike) {
				throw new HttpException('Already liked', HttpStatus.BAD_REQUEST);
			}

			// Create like
			const newLike = new this.likeModel({
				userId: user._id,
				targetType,
				targetId: new Types.ObjectId(targetId),
			});

			await newLike.save();

			// Update like count
			if (targetType === 'post') {
				await this.postModel.findByIdAndUpdate(targetId, {
					$inc: { 'counts.likes': 1 },
				});
			} else if (targetType === 'comment') {
				await this.commentModel.findByIdAndUpdate(targetId, {
					$inc: { 'counts.likes': 1 },
				});
			}

			return 'Liked successfully';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not like target',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async unlikeTarget(user: UserDocument, targetType: string, targetId: string) {
		try {
			const like = await this.likeModel
				.findOneAndDelete({
					userId: user._id,
					targetType,
					targetId: new Types.ObjectId(targetId),
				})
				.exec();

			if (!like) {
				throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
			}

			// Update like count
			if (targetType === 'post') {
				await this.postModel.findByIdAndUpdate(targetId, {
					$inc: { 'counts.likes': -1 },
				});
			} else if (targetType === 'comment') {
				await this.commentModel.findByIdAndUpdate(targetId, {
					$inc: { 'counts.likes': -1 },
				});
			}

			return 'Unliked successfully';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not unlike target',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getLikes(query: GetLikesDto) {
		try {
			const { page = 1, limit = 20, targetType, targetId } = query;
			const skip = (page - 1) * limit;

			const filter: any = {};
			if (targetType) filter.targetType = targetType;
			if (targetId) filter.targetId = new Types.ObjectId(targetId);

			const likes = await this.likeModel
				.find(filter)
				.populate('userId', 'username profile.avatar')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.likeModel.countDocuments(filter);

			return {
				likes,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get likes',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async checkIfLiked(
		userId: Types.ObjectId,
		targetType: string,
		targetId: string,
	): Promise<boolean> {
		try {
			const like = await this.likeModel
				.findOne({
					userId,
					targetType,
					targetId: new Types.ObjectId(targetId),
				})
				.exec();

			return !!like;
		} catch (error) {
			return false;
		}
	}

	async getUserLikes(userId: string, query: GetLikesDto) {
		try {
			const { page = 1, limit = 20 } = query;
			const skip = (page - 1) * limit;

			const likes = await this.likeModel
				.find({ userId: new Types.ObjectId(userId) })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.likeModel.countDocuments({
				userId: new Types.ObjectId(userId),
			});

			return {
				likes,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get user likes',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
