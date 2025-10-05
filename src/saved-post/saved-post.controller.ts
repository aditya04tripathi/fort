import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { SavedPostService } from './saved-post.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { GetSavedPostsDto, SavePostDto } from './dto';

@Controller('saved-post')
export class SavedPostController {
	constructor(private readonly savedPostService: SavedPostService) {}

	@UseGuards(JwtGuard)
	@Post()
	savePost(@GetUser() user: UserDocument, @Body() savePostDto: SavePostDto) {
		return this.savedPostService.savePost(user, savePostDto);
	}

	@UseGuards(JwtGuard)
	@Delete(':postId')
	unsavePost(@GetUser() user: UserDocument, @Param('postId') postId: string) {
		return this.savedPostService.unsavePost(user, postId);
	}

	@UseGuards(JwtGuard)
	@Get()
	getSavedPosts(
		@GetUser() user: UserDocument,
		@Query() query: GetSavedPostsDto,
	) {
		return this.savedPostService.getSavedPosts(user, query);
	}

	@UseGuards(JwtGuard)
	@Get('collections')
	getCollections(@GetUser() user: UserDocument) {
		return this.savedPostService.getCollections(user);
	}

	@UseGuards(JwtGuard)
	@Get('check/:postId')
	checkIfSaved(@GetUser() user: UserDocument, @Param('postId') postId: string) {
		return this.savedPostService.checkIfSaved(user, postId);
	}
}
