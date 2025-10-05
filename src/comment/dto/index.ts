import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

// ===================================
// CREATE COMMENT DTO
// ===================================

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(2200)
	text: string;

	@IsString()
	@IsOptional()
	parentCommentId?: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	mentions?: string[];
}

// ===================================
// UPDATE COMMENT DTO
// ===================================

export class UpdateCommentDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(2200)
	text: string;

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	mentions?: string[];
}

// ===================================
// QUERY DTOs
// ===================================

export class GetCommentsDto {
	@IsOptional()
	page?: number;

	@IsOptional()
	limit?: number;

	@IsString()
	@IsOptional()
	parentCommentId?: string;
}
