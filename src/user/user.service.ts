import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Follow } from '../schema/follow.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		@InjectModel(Follow.name) private followModel: Model<Follow>,
	) {}

	async getUserById(id: string, user: UserDocument) {
		try {
			const foundUser = await this.userModel
				.findById(id)
				.select('-passwordHash');

			if (!foundUser) {
				throw new HttpException(
					`User with id ${id} not found`,
					HttpStatus.NOT_FOUND,
				);
			}

			if (foundUser._id.equals(user._id)) {
				return foundUser;
			}

			if (foundUser.isPrivate) {
				throw new HttpException(
					'User profile is private',
					HttpStatus.FORBIDDEN,
				);
			}

			return foundUser;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'An error occurred while fetching the user',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async togglePrivateAccount(user: UserDocument) {
		try {
			const updatedUser = await this.userModel
				.findByIdAndUpdate(
					user._id,
					{ isPrivate: !user.isPrivate },
					{ new: true },
				)
				.select('-passwordHash');

			if (!updatedUser) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			return updatedUser;
		} catch (error) {
			throw new HttpException(
				(error as Error).message ||
					'An error occurred while toggling private account',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async searchUsers(query: string) {
		try {
			const users = await this.userModel
				.find({
					$or: [
						{ username: { $regex: query, $options: 'i' } },
						{ name: { $regex: query, $options: 'i' } },
					],
				})
				.select('-passwordHash')
				.limit(10);

			return users;
		} catch (error) {
			throw new HttpException(
				(error as Error).message ||
					'An error occurred while searching for users',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getUserSuggestions(id: string) {
		try {
			const user = await this.userModel.findById(id);

			if (!user) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			// Get all users that the current user is following (accepted only)
			const followingRelations = await this.followModel
				.find({
					followerId: new Types.ObjectId(id),
					status: 'accepted',
				})
				.select('followingId');

			const followingIds = followingRelations.map((f) => f.followingId);

			// Find users that the current user is not following
			const suggestions = await this.userModel
				.find({
					_id: { $ne: new Types.ObjectId(id), $nin: followingIds },
				})
				.select('-passwordHash')
				.limit(10);

			return suggestions;
		} catch (error) {
			throw new HttpException(
				(error as Error).message ||
					'An error occurred while fetching user suggestions',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateProfile(user: UserDocument, updateData: Partial<UserDocument>) {
		try {
			const allowedTopLevel = ['username', 'profile'];
			const updates = Object.keys(updateData || {});

			if (updates.length === 0) {
				throw new HttpException('No updates provided', HttpStatus.BAD_REQUEST);
			}

			const isTopValid = updates.every((u) => allowedTopLevel.includes(u));
			if (!isTopValid) {
				throw new HttpException('Invalid updates!', HttpStatus.BAD_REQUEST);
			}

			const updatePayload: Record<string, any> = {};

			if (updateData.username && updateData.username !== user.username) {
				const existing = await this.userModel.findOne({
					username: updateData.username,
				});
				if (existing) {
					throw new HttpException(
						'Username already taken',
						HttpStatus.CONFLICT,
					);
				}
				updatePayload.username = updateData.username;
			}

			// handle nested profile updates
			if (updateData.profile) {
				const allowedProfileKeys = [
					'bio',
					'avatar',
					'website',
					'phoneNumber',
					'gender',
				];
				const profileUpdates = Object.keys(
					updateData.profile as Record<string, any>,
				);
				const isProfileValid = profileUpdates.every((p) =>
					allowedProfileKeys.includes(p),
				);
				if (!isProfileValid) {
					throw new HttpException(
						'Invalid profile updates!',
						HttpStatus.BAD_REQUEST,
					);
				}

				for (const key of profileUpdates) {
					updatePayload[`profile.${key}`] = (
						updateData.profile as Record<string, any>
					)[key];
				}
			}

			const updatedUser = await this.userModel
				.findByIdAndUpdate(user._id, updatePayload, { new: true })
				.select('-passwordHash');

			if (!updatedUser) {
				throw new HttpException('User not found', HttpStatus.NOT_FOUND);
			}

			return updatedUser;
		} catch (error) {
			throw new HttpException(
				(error as Error).message ||
					'An error occurred while updating the profile',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
