import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from 'src/utils/decorators';
import type { UserDocument } from 'src/schema/user.schema';
import type { GetFollowersDto, GetFollowingDto } from './dto';

@Controller('follow')
export class FollowController {
	constructor(private readonly followService: FollowService) {}

	@UseGuards(JwtGuard)
	@Post(':followingId')
	followUser(
		@GetUser() user: UserDocument,
		@Param('followingId') followingId: string,
	) {
		return this.followService.followUser(user, followingId);
	}

	@UseGuards(JwtGuard)
	@Delete(':followingId')
	unfollowUser(
		@GetUser() user: UserDocument,
		@Param('followingId') followingId: string,
	) {
		return this.followService.unfollowUser(user, followingId);
	}

	@Get('followers/:userId')
	getFollowers(
		@Param('userId') userId: string,
		@Query() query: GetFollowersDto,
	) {
		return this.followService.getFollowers(userId, query);
	}

	@Get('following/:userId')
	getFollowing(
		@Param('userId') userId: string,
		@Query() query: GetFollowingDto,
	) {
		return this.followService.getFollowing(userId, query);
	}

	@UseGuards(JwtGuard)
	@Get('requests/pending')
	getPendingRequests(
		@GetUser() user: UserDocument,
		@Query() query: GetFollowersDto,
	) {
		return this.followService.getPendingRequests(user, query);
	}

	@UseGuards(JwtGuard)
	@Post('requests/:followerId/accept')
	acceptFollowRequest(
		@GetUser() user: UserDocument,
		@Param('followerId') followerId: string,
	) {
		return this.followService.acceptFollowRequest(user, followerId);
	}

	@UseGuards(JwtGuard)
	@Delete('requests/:followerId/reject')
	rejectFollowRequest(
		@GetUser() user: UserDocument,
		@Param('followerId') followerId: string,
	) {
		return this.followService.rejectFollowRequest(user, followerId);
	}
}
