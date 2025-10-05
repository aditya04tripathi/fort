import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Follow } from 'src/schema/follow.schema';
import { User } from 'src/schema/user.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { GetFollowersDto, GetFollowingDto } from './dto';

@Injectable()
export class FollowService {
	constructor(
		@InjectModel(Follow.name) private followModel: Model<Follow>,
		@InjectModel(User.name) private userModel: Model<User>,
	) {}

	async followUser(currentUser: UserDocument, followingId: string) {
		try {
			if (currentUser._id.toString() === followingId) {
				throw new HttpException(
					'Cannot follow yourself',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Check if user to follow exists
			const userToFollow = await this.userModel.findById(followingId);
			if (!userToFollow) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			// Check if already following
			const existingFollow = await this.followModel
				.findOne({
					followerId: currentUser._id,
					followingId: new Types.ObjectId(followingId),
				})
				.exec();

			if (existingFollow) {
				throw new HttpException(
					'Already following this user',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Determine status based on account privacy
			const status = userToFollow.isPrivate ? 'pending' : 'accepted';

			// Create follow
			const newFollow = new this.followModel({
				followerId: currentUser._id,
				followingId: new Types.ObjectId(followingId),
				followerUsername: currentUser.username,
				followingUsername: userToFollow.username,
				status,
			});

			await newFollow.save();

			// Update counts only if accepted
			if (status === 'accepted') {
				await this.userModel.findByIdAndUpdate(currentUser._id, {
					$inc: { 'counts.following': 1 },
				});
				await this.userModel.findByIdAndUpdate(followingId, {
					$inc: { 'counts.followers': 1 },
				});
			}

			return {
				message:
					status === 'pending'
						? 'Follow request sent'
						: 'Following successfully',
				follow: newFollow,
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not follow user',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async unfollowUser(currentUser: UserDocument, followingId: string) {
		try {
			const follow = await this.followModel
				.findOneAndDelete({
					followerId: currentUser._id,
					followingId: new Types.ObjectId(followingId),
				})
				.exec();

			if (!follow) {
				throw new HttpException('Follow not found', HttpStatus.NOT_FOUND);
			}

			// Update counts only if it was accepted
			if (follow.status === 'accepted') {
				await this.userModel.findByIdAndUpdate(currentUser._id, {
					$inc: { 'counts.following': -1 },
				});
				await this.userModel.findByIdAndUpdate(followingId, {
					$inc: { 'counts.followers': -1 },
				});
			}

			return { message: 'Unfollowed successfully' };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not unfollow user',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getFollowers(userId: string, query: GetFollowersDto) {
		try {
			const { page = 1, limit = 20, status } = query;
			const skip = (page - 1) * limit;

			const filter: any = { followingId: new Types.ObjectId(userId) };
			if (status) filter.status = status;
			else filter.status = 'accepted'; // Default to accepted only

			const followers = await this.followModel
				.find(filter)
				.populate('followerId', 'username profile.avatar profile.fullName')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.followModel.countDocuments(filter);

			return {
				followers,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get followers',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getFollowing(userId: string, query: GetFollowingDto) {
		try {
			const { page = 1, limit = 20, status } = query;
			const skip = (page - 1) * limit;

			const filter: any = { followerId: new Types.ObjectId(userId) };
			if (status) filter.status = status;
			else filter.status = 'accepted'; // Default to accepted only

			const following = await this.followModel
				.find(filter)
				.populate('followingId', 'username profile.avatar profile.fullName')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.followModel.countDocuments(filter);

			return {
				following,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get following',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async acceptFollowRequest(currentUser: UserDocument, followerId: string) {
		try {
			const follow = await this.followModel
				.findOne({
					followerId: new Types.ObjectId(followerId),
					followingId: currentUser._id,
					status: 'pending',
				})
				.exec();

			if (!follow) {
				throw new HttpException(
					'Follow request not found',
					HttpStatus.NOT_FOUND,
				);
			}

			follow.status = 'accepted';
			await follow.save();

			// Update counts
			await this.userModel.findByIdAndUpdate(followerId, {
				$inc: { 'counts.following': 1 },
			});
			await this.userModel.findByIdAndUpdate(currentUser._id, {
				$inc: { 'counts.followers': 1 },
			});

			return { message: 'Follow request accepted', follow };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not accept follow request',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async rejectFollowRequest(currentUser: UserDocument, followerId: string) {
		try {
			const follow = await this.followModel
				.findOneAndDelete({
					followerId: new Types.ObjectId(followerId),
					followingId: currentUser._id,
					status: 'pending',
				})
				.exec();

			if (!follow) {
				throw new HttpException(
					'Follow request not found',
					HttpStatus.NOT_FOUND,
				);
			}

			return { message: 'Follow request rejected' };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not reject follow request',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getPendingRequests(currentUser: UserDocument, query: GetFollowersDto) {
		try {
			const { page = 1, limit = 20 } = query;
			const skip = (page - 1) * limit;

			const requests = await this.followModel
				.find({
					followingId: currentUser._id,
					status: 'pending',
				})
				.populate('followerId', 'username profile.avatar profile.fullName')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.followModel.countDocuments({
				followingId: currentUser._id,
				status: 'pending',
			});

			return {
				requests,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get pending requests',
				(error as any).status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
