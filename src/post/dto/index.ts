import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// NESTED DTOs
// ===================================

export class CoordinatesDto {
	@IsNumber()
	@IsNotEmpty()
	latitude: number;

	@IsNumber()
	@IsNotEmpty()
	longitude: number;
}

export class LocationDto {
	@IsString()
	@IsOptional()
	name?: string;

	@ValidateNested()
	@Type(() => CoordinatesDto)
	@IsOptional()
	coordinates?: CoordinatesDto;
}

export class MediaDto {
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
	width?: number;

	@IsNumber()
	@IsOptional()
	@Min(0)
	height?: number;

	@IsNumber()
	@IsOptional()
	@Min(0)
	duration?: number;
}

// ===================================
// CREATE POST DTO
// ===================================

export class CreatePostDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MediaDto)
	@IsNotEmpty()
	media: MediaDto[];

	@IsString()
	@IsOptional()
	@MaxLength(2200)
	caption?: string;

	@ValidateNested()
	@Type(() => LocationDto)
	@IsOptional()
	location?: LocationDto;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	hashtags?: string[];

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	mentions?: string[];

	@IsBoolean()
	@IsOptional()
	isCommentsEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isLikesVisible?: boolean;
}

// ===================================
// UPDATE POST DTO
// ===================================

export class UpdatePostDto {
	@IsString()
	@IsOptional()
	@MaxLength(2200)
	caption?: string;

	@ValidateNested()
	@Type(() => LocationDto)
	@IsOptional()
	location?: LocationDto;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	hashtags?: string[];

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	mentions?: string[];

	@IsBoolean()
	@IsOptional()
	isCommentsEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isLikesVisible?: boolean;
}

// ===================================
// QUERY/FILTER DTOs
// ===================================

export class GetFeedDto {
	@IsNumber()
	@IsOptional()
	@Min(1)
	@Type(() => Number)
	page?: number = 1;

	@IsNumber()
	@IsOptional()
	@Min(1)
	@Type(() => Number)
	limit?: number = 20;

	@IsString()
	@IsOptional()
	userId?: string;

	@IsString()
	@IsOptional()
	hashtag?: string;
}

export class GetUserPostsDto {
	@IsNumber()
	@IsOptional()
	@Min(1)
	@Type(() => Number)
	page?: number = 1;

	@IsNumber()
	@IsOptional()
	@Min(1)
	@Type(() => Number)
	limit?: number = 20;
}
