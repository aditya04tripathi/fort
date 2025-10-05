import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// SAVE POST DTO
// ===================================

export class SavePostDto {
	@IsString()
	@IsNotEmpty()
	postId: string;

	@IsString()
	@IsOptional()
	collectionName?: string;
}

// ===================================
// UNSAVE POST DTO
// ===================================

export class UnsavePostDto {
	@IsString()
	@IsNotEmpty()
	postId: string;
}

// ===================================
// COLLECTION DTOs
// ===================================

export class CreateCollectionDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsOptional()
	description?: string;
}

export class GetCollectionsDto {
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 20;
}

// ===================================
// QUERY DTOs
// ===================================

export class GetSavedPostsDto {
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
	collectionName?: string;
}
