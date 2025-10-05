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
import { StoryService } from './story.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateStoryDto, GetStoriesDto } from './dto';

@Controller('story')
export class StoryController {
	constructor(private readonly storyService: StoryService) {}

	@UseGuards(JwtGuard)
	@Post()
	createStory(
		@GetUser() user: UserDocument,
		@Body() createStoryDto: CreateStoryDto,
	) {
		return this.storyService.createStory(user, createStoryDto);
	}

	@UseGuards(JwtGuard)
	@Get()
	getStories(@Query() query: GetStoriesDto) {
		return this.storyService.getStories(query);
	}

	@UseGuards(JwtGuard)
	@Get('user/:userId')
	getUserStories(@Param('userId') userId: string) {
		return this.storyService.getUserStories(userId);
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	getStoryById(@Param('id') storyId: string, @GetUser() user: UserDocument) {
		return this.storyService.getStoryById(storyId, user);
	}

	@UseGuards(JwtGuard)
	@Post(':id/view')
	viewStory(@Param('id') storyId: string, @GetUser() user: UserDocument) {
		return this.storyService.viewStory(storyId, user);
	}

	@UseGuards(JwtGuard)
	@Get(':id/viewers')
	getStoryViewers(@Param('id') storyId: string, @GetUser() user: UserDocument) {
		return this.storyService.getStoryViewers(storyId, user);
	}

	@UseGuards(JwtGuard)
	@Delete(':id')
	deleteStory(@Param('id') storyId: string, @GetUser() user: UserDocument) {
		return this.storyService.deleteStory(storyId, user);
	}
}
