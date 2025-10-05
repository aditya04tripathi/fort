import {
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

// ===================================
// UPDATE PROFILE DTO
// ===================================

export class UpdateUserProfileDto {
	@IsString()
	@IsOptional()
	@MaxLength(100)
	fullName?: string;

	@IsString()
	@IsOptional()
	@MaxLength(150)
	bio?: string;

	@IsString()
	@IsOptional()
	avatar?: string;

	@IsString()
	@IsOptional()
	website?: string;

	@IsString()
	@IsOptional()
	phoneNumber?: string;

	@IsEnum(['male', 'female', 'other', 'prefer_not_to_say'])
	@IsOptional()
	gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	@MinLength(3)
	@MaxLength(30)
	username?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsBoolean()
	@IsOptional()
	isPrivate?: boolean;

	@IsOptional()
	profile?: UpdateUserProfileDto;
}

// ===================================
// SEARCH & QUERY DTOs
// ===================================

export class SearchUsersDto {
	@IsString()
	query: string;

	@IsOptional()
	limit?: number;
}

export class GetFollowersDto {
	@IsOptional()
	page?: number;

	@IsOptional()
	limit?: number;
}

export class GetFollowingDto {
	@IsOptional()
	page?: number;

	@IsOptional()
	limit?: number;
}
