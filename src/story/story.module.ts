import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from 'src/schema/story.schema';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }]),
	],
	providers: [StoryService],
	controllers: [StoryController],
	exports: [StoryService],
})
export class StoryModule {}
