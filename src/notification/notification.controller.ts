import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateNotificationDto, GetNotificationsDto } from './dto';

@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(JwtGuard)
	@Post()
	createNotification(@Body() createNotificationDto: CreateNotificationDto) {
		return this.notificationService.createNotification(createNotificationDto);
	}

	@UseGuards(JwtGuard)
	@Get()
	getNotifications(
		@GetUser() user: UserDocument,
		@Query() query: GetNotificationsDto,
	) {
		return this.notificationService.getNotifications(user, query);
	}

	@UseGuards(JwtGuard)
	@Get('unread-count')
	getUnreadCount(@GetUser() user: UserDocument) {
		return this.notificationService.getUnreadCount(user);
	}

	@UseGuards(JwtGuard)
	@Patch(':id/read')
	markAsRead(
		@GetUser() user: UserDocument,
		@Param('id') notificationId: string,
	) {
		return this.notificationService.markAsRead(user, notificationId);
	}

	@UseGuards(JwtGuard)
	@Patch('read-all')
	markAllAsRead(@GetUser() user: UserDocument) {
		return this.notificationService.markAllAsRead(user);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	deleteNotification(
		@GetUser() user: UserDocument,
		@Param('id') notificationId: string,
	) {
		return this.notificationService.deleteNotification(user, notificationId);
	}
}
