import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
class StoryCounts {
	@Prop({ default: 0 })
	views: number;

	@Prop({ default: 0 })
	replies: number;
}

const StoryCountsSchema = SchemaFactory.createForClass(StoryCounts);

// Story Media (Different from Post Media)
@Schema({ _id: false })
class StoryMedia {
	@Prop({
		type: String,
		enum: ['image', 'video'],
		required: true,
	})
	type: 'image' | 'video';

	@Prop({ required: true })
	url: string;

	@Prop()
	thumbnailUrl?: string;

	@Prop({ default: 5000 })
	duration: number;
}

const StoryMediaSchema = SchemaFactory.createForClass(StoryMedia);

// Story Sticker
@Schema({ _id: false })
class StickerPosition {
	@Prop()
	x: number;

	@Prop()
	y: number;
}

const StickerPositionSchema = SchemaFactory.createForClass(StickerPosition);

@Schema({ _id: false })
class Sticker {
	@Prop({
		type: String,
		enum: ['location', 'mention', 'hashtag', 'poll', 'question', 'music'],
	})
	type: string;

	@Prop({ type: Object })
	data: any;

	@Prop({ type: StickerPositionSchema })
	position: StickerPosition;
}

const StickerSchema = SchemaFactory.createForClass(Sticker);

// ===================================
// STORY SCHEMA
// ===================================
@Schema({ timestamps: true })
export class Story {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	userId: Types.ObjectId;

	@Prop({ required: true })
	username: string;

	@Prop()
	userAvatar: string;

	@Prop({ type: StoryMediaSchema, required: true })
	media: StoryMedia;

	@Prop({ type: [StickerSchema] })
	stickers: Sticker[];

	@Prop({ type: StoryCountsSchema })
	counts: StoryCounts;

	@Prop([{ type: Types.ObjectId, ref: 'User' }])
	viewedBy: Types.ObjectId[];

	@Prop({ required: true, index: true })
	expiresAt: Date;
}

export type StoryDocument = HydratedDocument<Story>;
export const StorySchema = SchemaFactory.createForClass(Story);

StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
StorySchema.index({ userId: 1, createdAt: -1 });

StorySchema.pre('save', function (next) {
	if (this.isNew && !this.expiresAt) {
		this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
	}
	next();
});
