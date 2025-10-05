import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from 'src/schema/follow.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Follow.name, schema: FollowSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	providers: [FollowService],
	controllers: [FollowController],
	exports: [FollowService],
})
export class FollowModule {}
