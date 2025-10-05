import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { Follow, FollowSchema } from '../schema/follow.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Follow.name, schema: FollowSchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
