import { IsEnum, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// ===================================
// FOLLOW USER DTO
// ===================================

export class FollowUserDto {
	@IsString()
	@IsNotEmpty()
	followingId: string;
}

// ===================================
// UNFOLLOW USER DTO
// ===================================

export class UnfollowUserDto {
	@IsString()
	@IsNotEmpty()
	followingId: string;
}

// ===================================
// QUERY DTOs
// ===================================

export class GetFollowersDto {
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

	@IsEnum(['pending', 'accepted'])
	@IsOptional()
	status?: 'pending' | 'accepted';
}

export class GetFollowingDto {
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

	@IsEnum(['pending', 'accepted'])
	@IsOptional()
	status?: 'pending' | 'accepted';
}

// ===================================
// ACCEPT/REJECT FOLLOW REQUEST DTOs
// ===================================

export class AcceptFollowRequestDto {
	@IsString()
	@IsNotEmpty()
	followerId: string;
}

export class RejectFollowRequestDto {
	@IsString()
	@IsNotEmpty()
	followerId: string;
}
