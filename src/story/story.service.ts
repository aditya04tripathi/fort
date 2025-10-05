import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Story } from 'src/schema/story.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateStoryDto, GetStoriesDto } from './dto';

@Injectable()
export class StoryService {
	constructor(@InjectModel(Story.name) private storyModel: Model<Story>) {}

	async createStory(user: UserDocument, createStoryDto: CreateStoryDto) {
		try {
			const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

			const newStory = new this.storyModel({
				userId: user._id,
				username: user.username,
				userAvatar: user.profile.avatar,
				media: createStoryDto.media,
				stickers: createStoryDto.stickers || [],
				expiresAt,
			});

			await newStory.save();
			return newStory;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not create story',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getStories(query: GetStoriesDto) {
		try {
			const { page = 1, limit = 20, userId } = query;
			const skip = (page - 1) * limit;

			const filter: any = {
				expiresAt: { $gt: new Date() }, // Only non-expired stories
			};
			if (userId) {
				filter.userId = new Types.ObjectId(userId);
			}

			const stories = await this.storyModel
				.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.storyModel.countDocuments(filter);

			return {
				stories,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get stories',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getStoryById(storyId: string, user: UserDocument) {
		try {
			const story = await this.storyModel.findById(storyId).exec();
			if (!story) {
				throw new HttpException('Story not found', HttpStatus.NOT_FOUND);
			}

			// Check if expired
			if (story.expiresAt < new Date()) {
				throw new HttpException('Story has expired', HttpStatus.GONE);
			}

			return story;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get story',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async viewStory(storyId: string, user: UserDocument) {
		try {
			const story = await this.storyModel.findById(storyId).exec();
			if (!story) {
				throw new HttpException('Story not found', HttpStatus.NOT_FOUND);
			}

			// Add user to viewedBy if not already viewed
			if (!story.viewedBy.includes(user._id)) {
				story.viewedBy.push(user._id);
				story.counts.views += 1;
				await story.save();
			}

			return 'Story viewed';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not view story',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async deleteStory(storyId: string, user: UserDocument) {
		try {
			const story = await this.storyModel.findById(storyId).exec();
			if (!story) {
				throw new HttpException('Story not found', HttpStatus.NOT_FOUND);
			}

			if (story.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to delete this story',
					HttpStatus.FORBIDDEN,
				);
			}

			await this.storyModel.findByIdAndDelete(storyId).exec();
			return 'Story deleted successfully';
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not delete story',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getUserStories(userId: string) {
		try {
			const stories = await this.storyModel
				.find({
					userId: new Types.ObjectId(userId),
					expiresAt: { $gt: new Date() },
				})
				.sort({ createdAt: -1 })
				.exec();

			return stories;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get user stories',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getStoryViewers(storyId: string, user: UserDocument) {
		try {
			const story = await this.storyModel
				.findById(storyId)
				.populate('viewedBy', 'username profile.avatar profile.fullName')
				.exec();

			if (!story) {
				throw new HttpException('Story not found', HttpStatus.NOT_FOUND);
			}

			if (story.userId.toString() !== user._id.toString()) {
				throw new HttpException(
					'Unauthorized to view story viewers',
					HttpStatus.FORBIDDEN,
				);
			}

			return {
				viewers: story.viewedBy,
				totalViews: story.counts.views,
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get story viewers',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
