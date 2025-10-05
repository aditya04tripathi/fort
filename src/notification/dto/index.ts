import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// CREATE NOTIFICATION DTO
// ===================================

export class CreateNotificationDto {
	@IsString()
	@IsNotEmpty()
	recipientId: string;

	@IsEnum([
		'like',
		'comment',
		'follow',
		'mention',
		'story_reply',
		'follow_request',
	])
	@IsNotEmpty()
	type:
		| 'like'
		| 'comment'
		| 'follow'
		| 'mention'
		| 'story_reply'
		| 'follow_request';

	@IsString()
	@IsNotEmpty()
	actorId: string;

	@IsString()
	@IsNotEmpty()
	message: string;

	@IsString()
	@IsOptional()
	postId?: string;

	@IsString()
	@IsOptional()
	commentId?: string;

	@IsString()
	@IsOptional()
	storyId?: string;
}

// ===================================
// QUERY DTOs
// ===================================

export class GetNotificationsDto {
	@IsOptional()
	page?: number;

	@IsOptional()
	limit?: number;

	@IsBoolean()
	@IsOptional()
	unreadOnly?: boolean;
}

// ===================================
// MARK READ DTOs
// ===================================

export class MarkNotificationReadDto {
	@IsString()
	@IsNotEmpty()
	notificationId: string;
}

export class MarkAllNotificationsReadDto {
	// No fields needed, will mark all as read for the authenticated user
}
