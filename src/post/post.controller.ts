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
import { PostService } from './post.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreatePostDto, GetFeedDto, UpdatePostDto } from './dto';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@UseGuards(JwtGuard)
	@Get()
	generateFeed(@GetUser() user: UserDocument, @Query() query: GetFeedDto) {
		return this.postService.generateFeed(user, query);
	}

	@UseGuards(JwtGuard)
	@Post()
	createPost(
		@GetUser() user: UserDocument,
		@Body() createPostDto: CreatePostDto,
	) {
		return this.postService.createPost(user, createPostDto);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	getPostById(@Param('id') postId: string, @GetUser() user: UserDocument) {
		return this.postService.getPostById(postId, user);
	}

	@UseGuards(JwtGuard)
	@Put(':id')
	updatePost(
		@Param('id') postId: string,
		@GetUser() user: UserDocument,
		@Body() updatePostDto: UpdatePostDto,
	) {
		return this.postService.updatePost(postId, user, updatePostDto);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	deletePost(@Param('id') postId: string, @GetUser() user: UserDocument) {
		return this.postService.deletePost(postId, user);
	}
}
