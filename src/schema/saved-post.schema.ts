import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// ===================================
// SAVED POST SCHEMA
// ===================================
@Schema({ timestamps: true })
export class SavedPost {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	userId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Post', required: true })
	postId: Types.ObjectId;

	@Prop({ default: 'All Posts' })
	collectionName: string;
}

export type SavedPostDocument = HydratedDocument<SavedPost>;
export const SavedPostSchema = SchemaFactory.createForClass(SavedPost);

SavedPostSchema.index({ userId: 1, createdAt: -1 });
SavedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });
