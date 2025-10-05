import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateCommentDto, GetCommentsDto, UpdateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UseGuards(JwtGuard)
	@Post('post/:postId')
	createComment(
		@Param('postId') postId: string,
		@GetUser() user: UserDocument,
		@Body() createCommentDto: CreateCommentDto,
	) {
		return this.commentService.createComment(postId, user, createCommentDto);
	}

	@Get('post/:postId')
	getCommentsByPostId(
		@Param('postId') postId: string,
		@Query() query: GetCommentsDto,
	) {
		return this.commentService.getCommentsByPostId(postId, query);
	}

	@Get(':id')
	getCommentById(@Param('id') commentId: string) {
		return this.commentService.getCommentById(commentId);
	}

	@Get(':id/replies')
	getReplies(@Param('id') commentId: string, @Query() query: GetCommentsDto) {
		return this.commentService.getReplies(commentId, query);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	updateComment(
		@Param('id') commentId: string,
		@GetUser() user: UserDocument,
		@Body() updateCommentDto: UpdateCommentDto,
	) {
		return this.commentService.updateComment(commentId, user, updateCommentDto);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	deleteComment(@Param('id') commentId: string, @GetUser() user: UserDocument) {
		return this.commentService.deleteComment(commentId, user);
	}
}
