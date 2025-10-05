import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// NESTED DTOs FOR STORY
// ===================================

export class StickerPositionDto {
	@IsNumber()
	@IsNotEmpty()
	x: number;

	@IsNumber()
	@IsNotEmpty()
	y: number;
}

export class StickerDto {
	@IsEnum(['location', 'mention', 'hashtag', 'poll', 'question', 'music'])
	@IsNotEmpty()
	type: 'location' | 'mention' | 'hashtag' | 'poll' | 'question' | 'music';

	@IsOptional()
	data?: any;

	@ValidateNested()
	@Type(() => StickerPositionDto)
	@IsNotEmpty()
	position: StickerPositionDto;
}

export class StoryMediaDto {
	@IsEnum(['image', 'video'])
	@IsNotEmpty()
	type: 'image' | 'video';

	@IsString()
	@IsNotEmpty()
	url: string;

	@IsString()
	@IsOptional()
	thumbnailUrl?: string;

	@IsNumber()
	@IsOptional()
	@Min(0)
	duration?: number;
}

// ===================================
// CREATE STORY DTO
// ===================================

export class CreateStoryDto {
	@ValidateNested()
	@Type(() => StoryMediaDto)
	@IsNotEmpty()
	media: StoryMediaDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => StickerDto)
	@IsOptional()
	stickers?: StickerDto[];

	@IsEnum(['public', 'followers', 'close_friends'])
	@IsOptional()
	visibility?: 'public' | 'followers' | 'close_friends';

	@IsBoolean()
	@IsOptional()
	allowReplies?: boolean;
}

// ===================================
// QUERY DTOs
// ===================================

export class GetStoriesDto {
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 20;

	@IsString()
	@IsOptional()
	userId?: string;
}
