import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { Post, PostSchema } from 'src/schema/post.schema';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Comment.name, schema: CommentSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	providers: [CommentService],
	controllers: [CommentController],
	exports: [CommentService],
})
export class CommentModule {}
