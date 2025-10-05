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
import { LikeService } from './like.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { CreateLikeDto, GetLikesDto } from './dto';

@Controller('like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@UseGuards(JwtGuard)
	@Post()
	likeTarget(
		@GetUser() user: UserDocument,
		@Body() createLikeDto: CreateLikeDto,
	) {
		return this.likeService.likeTarget(user, createLikeDto);
	}

	@UseGuards(JwtGuard)
	@Delete(':targetType/:targetId')
	unlikeTarget(
		@GetUser() user: UserDocument,
		@Param('targetType') targetType: string,
		@Param('targetId') targetId: string,
	) {
		return this.likeService.unlikeTarget(user, targetType, targetId);
	}

	@Get()
	getLikes(@Query() query: GetLikesDto) {
		return this.likeService.getLikes(query);
	}

	@Get('user/:userId')
	getUserLikes(@Param('userId') userId: string, @Query() query: GetLikesDto) {
		return this.likeService.getUserLikes(userId, query);
	}

	@UseGuards(JwtGuard)
	@Get('check/:targetType/:targetId')
	checkIfLiked(
		@GetUser() user: UserDocument,
		@Param('targetType') targetType: string,
		@Param('targetId') targetId: string,
	) {
		return this.likeService.checkIfLiked(user._id, targetType, targetId);
	}
}
