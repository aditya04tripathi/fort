import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from 'src/schema/like.schema';
import { Post, PostSchema } from 'src/schema/post.schema';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Like.name, schema: LikeSchema },
			{ name: Post.name, schema: PostSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
	],
	providers: [LikeService],
	controllers: [LikeController],
	exports: [LikeService],
})
export class LikeModule {}
