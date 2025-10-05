import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/utils/decorators';
import { JwtGuard } from 'src/utils/guards';
import type { UserDocument } from '../schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get('me')
	getCurrentUser(@GetUser() user: UserDocument) {
		return user;
	}

	@UseGuards(JwtGuard)
	@Get(':id')
	getUserById(@Param('id') id: string, @GetUser() user: UserDocument) {
		return this.userService.getUserById(id, user);
	}

	@UseGuards(JwtGuard)
	@Post('private')
	togglePrivateAccount(@GetUser() user: UserDocument) {
		return this.userService.togglePrivateAccount(user);
	}

	@Get('search/:query')
	searchUsers(@Param('query') query: string) {
		return this.userService.searchUsers(query);
	}

	@Get('suggestions/:id')
	getUserSuggestions(@Param('id') id: string) {
		return this.userService.getUserSuggestions(id);
	}

	@UseGuards(JwtGuard)
	@Put('me')
	updateProfile(
		@GetUser() user: UserDocument,
		@Body() updateData: Partial<UserDocument>,
	) {
		return this.userService.updateProfile(user, updateData);
	}
}
