import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { StoryModule } from './story/story.module';
import { SavedPostModule } from './saved-post/saved-post.module';
import { NotificationModule } from './notification/notification.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { DATABASE_URL } from './constants';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DATABASE_URL || DATABASE_URL),
		DatabaseModule,
		JwtModule,
		AuthModule,
		UserModule,
		PostModule,
		CommentModule,
		LikeModule,
		FollowModule,
		StoryModule,
		SavedPostModule,
		NotificationModule,
		HashtagModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
