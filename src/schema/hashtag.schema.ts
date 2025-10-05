import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// Top Post (Used in Hashtag)
@Schema({ _id: false })
class TopPost {
	@Prop({ type: Types.ObjectId })
	postId: Types.ObjectId;

	@Prop()
	thumbnailUrl: string;
}

const TopPostSchema = SchemaFactory.createForClass(TopPost);

// ===================================
// HASHTAG SCHEMA
// ===================================
@Schema({
	_id: false,
	timestamps: { createdAt: false, updatedAt: 'lastUpdated' },
})
export class Hashtag {
	@Prop({ type: String, lowercase: true, required: true })
	_id: string;

	@Prop({ default: 0 })
	count: number;

	@Prop({ default: 0 })
	recentCount: number;

	@Prop({ default: false })
	trending: boolean;

	@Prop({ type: TopPostSchema })
	topPost?: TopPost;

	lastUpdated: Date;
}

export type HashtagDocument = HydratedDocument<Hashtag>;
export const HashtagSchema = SchemaFactory.createForClass(Hashtag);

HashtagSchema.index({ trending: 1, count: -1 });
HashtagSchema.index({ count: -1 });
