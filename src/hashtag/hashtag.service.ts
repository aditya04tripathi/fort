import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hashtag } from 'src/schema/hashtag.schema';
import { Post } from 'src/schema/post.schema';
import type {
	GetHashtagDto,
	GetHashtagPostsDto,
	GetTrendingHashtagsDto,
	SearchHashtagsDto,
} from './dto';

@Injectable()
export class HashtagService {
	constructor(
		@InjectModel(Hashtag.name) private hashtagModel: Model<Hashtag>,
		@InjectModel(Post.name) private postModel: Model<Post>,
	) {}

	async getHashtag(hashtag: string) {
		try {
			const hashtagDoc = await this.hashtagModel
				.findById(hashtag.toLowerCase())
				.exec();

			if (!hashtagDoc) {
				throw new HttpException('Hashtag not found', HttpStatus.NOT_FOUND);
			}

			return hashtagDoc;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get hashtag',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async searchHashtags(query: SearchHashtagsDto) {
		try {
			const { query: searchQuery, limit = 20 } = query;

			const hashtags = await this.hashtagModel
				.find({
					_id: { $regex: searchQuery.toLowerCase(), $options: 'i' },
				})
				.sort({ count: -1 })
				.limit(limit)
				.exec();

			return hashtags;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not search hashtags',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getTrendingHashtags(query: GetTrendingHashtagsDto) {
		try {
			const { limit = 10 } = query;

			const hashtags = await this.hashtagModel
				.find({ trending: true })
				.sort({ recentCount: -1, count: -1 })
				.limit(limit)
				.exec();

			return hashtags;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get trending hashtags',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getHashtagPosts(query: GetHashtagPostsDto) {
		try {
			const { hashtag, page = 1, limit = 20 } = query;
			const skip = (page - 1) * limit;

			const posts = await this.postModel
				.find({ hashtags: hashtag.toLowerCase() })
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.postModel.countDocuments({
				hashtags: hashtag.toLowerCase(),
			});

			return {
				posts,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get hashtag posts',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateOrCreateHashtag(hashtag: string, postId?: string) {
		try {
			const hashtagId = hashtag.toLowerCase();

			const existingHashtag = await this.hashtagModel.findById(hashtagId);

			if (existingHashtag) {
				existingHashtag.count += 1;
				existingHashtag.recentCount += 1;
				await existingHashtag.save();
			} else {
				const newHashtag = new this.hashtagModel({
					_id: hashtagId,
					count: 1,
					recentCount: 1,
				});
				await newHashtag.save();
			}
		} catch (error) {
			// Silent fail - hashtag update shouldn't break post creation
			console.error('Error updating hashtag:', error);
		}
	}

	async decrementHashtag(hashtag: string) {
		try {
			const hashtagId = hashtag.toLowerCase();
			const existingHashtag = await this.hashtagModel.findById(hashtagId);

			if (existingHashtag) {
				existingHashtag.count = Math.max(0, existingHashtag.count - 1);
				existingHashtag.recentCount = Math.max(
					0,
					existingHashtag.recentCount - 1,
				);
				await existingHashtag.save();
			}
		} catch (error) {
			console.error('Error decrementing hashtag:', error);
		}
	}
}
