import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// GET HASHTAG DTO
// ===================================

export class GetHashtagDto {
	@IsString()
	@IsNotEmpty()
	hashtag: string;
}

// ===================================
// SEARCH HASHTAGS DTO
// ===================================

export class SearchHashtagsDto {
	@IsString()
	@IsNotEmpty()
	query: string;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 20;
}

// ===================================
// GET TRENDING HASHTAGS DTO
// ===================================

export class GetTrendingHashtagsDto {
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 10;
}

// ===================================
// GET HASHTAG POSTS DTO
// ===================================

export class GetHashtagPostsDto {
	@IsString()
	@IsNotEmpty()
	hashtag: string;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 20;
}
