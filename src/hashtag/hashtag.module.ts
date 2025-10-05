import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hashtag, HashtagSchema } from 'src/schema/hashtag.schema';
import { Post, PostSchema } from 'src/schema/post.schema';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Hashtag.name, schema: HashtagSchema },
			{ name: Post.name, schema: PostSchema },
		]),
	],
	providers: [HashtagService],
	controllers: [HashtagController],
	exports: [HashtagService],
})
export class HashtagModule {}
