import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from 'src/schema/notification.schema';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateNotificationDto, GetNotificationsDto } from './dto';

@Injectable()
export class NotificationService {
	constructor(
		@InjectModel(Notification.name)
		private notificationModel: Model<Notification>,
	) {}

	async createNotification(createNotificationDto: CreateNotificationDto) {
		try {
			const newNotification = new this.notificationModel({
				...createNotificationDto,
				recipientId: new Types.ObjectId(createNotificationDto.recipientId),
				actorId: new Types.ObjectId(createNotificationDto.actorId),
				postId: createNotificationDto.postId
					? new Types.ObjectId(createNotificationDto.postId)
					: undefined,
				commentId: createNotificationDto.commentId
					? new Types.ObjectId(createNotificationDto.commentId)
					: undefined,
				storyId: createNotificationDto.storyId
					? new Types.ObjectId(createNotificationDto.storyId)
					: undefined,
			});

			await newNotification.save();
			return newNotification;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not create notification',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getNotifications(user: UserDocument, query: GetNotificationsDto) {
		try {
			const { page = 1, limit = 20, unreadOnly } = query;
			const skip = (page - 1) * limit;

			const filter: any = { recipientId: user._id };
			if (unreadOnly) {
				filter.isRead = false;
			}

			const notifications = await this.notificationModel
				.find(filter)
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit)
				.exec();

			const total = await this.notificationModel.countDocuments(filter);
			const unreadCount = await this.notificationModel.countDocuments({
				recipientId: user._id,
				isRead: false,
			});

			return {
				notifications,
				unreadCount,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not get notifications',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async markAsRead(user: UserDocument, notificationId: string) {
		try {
			const notification = await this.notificationModel
				.findOne({
					_id: new Types.ObjectId(notificationId),
					recipientId: user._id,
				})
				.exec();

			if (!notification) {
				throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
			}

			notification.isRead = true;
			await notification.save();

			return { message: 'Notification marked as read', notification };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not mark notification as read',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async markAllAsRead(user: UserDocument) {
		try {
			await this.notificationModel.updateMany(
				{ recipientId: user._id, isRead: false },
				{ isRead: true },
			);

			return { message: 'All notifications marked as read' };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not mark all notifications as read',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async deleteNotification(user: UserDocument, notificationId: string) {
		try {
			const notification = await this.notificationModel
				.findOneAndDelete({
					_id: new Types.ObjectId(notificationId),
					recipientId: user._id,
				})
				.exec();

			if (!notification) {
				throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
			}

			return { message: 'Notification deleted successfully' };
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'Could not delete notification',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getUnreadCount(user: UserDocument): Promise<number> {
		try {
			return await this.notificationModel.countDocuments({
				recipientId: user._id,
				isRead: false,
			});
		} catch (error) {
			return 0;
		}
	}
}
