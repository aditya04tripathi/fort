import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedPost, SavedPostSchema } from 'src/schema/saved-post.schema';
import { Post, PostSchema } from 'src/schema/post.schema';
import { SavedPostService } from './saved-post.service';
import { SavedPostController } from './saved-post.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: SavedPost.name, schema: SavedPostSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	providers: [SavedPostService],
	controllers: [SavedPostController],
	exports: [SavedPostService],
})
export class SavedPostModule {}
