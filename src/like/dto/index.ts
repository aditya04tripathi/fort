import { IsEnum, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// LIKE DTOs
// ===================================

export class CreateLikeDto {
	@IsEnum(['post', 'comment'])
	@IsNotEmpty()
	targetType: 'post' | 'comment';

	@IsString()
	@IsNotEmpty()
	targetId: string;
}

export class RemoveLikeDto {
	@IsEnum(['post', 'comment'])
	@IsNotEmpty()
	targetType: 'post' | 'comment';

	@IsString()
	@IsNotEmpty()
	targetId: string;
}

export class GetLikesDto {
	@IsOptional()
	@Type(() => Number)
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@Min(1)
	limit?: number = 20;

	@IsEnum(['post', 'comment'])
	@IsOptional()
	targetType?: 'post' | 'comment';

	@IsString()
	@IsOptional()
	targetId?: string;
}
