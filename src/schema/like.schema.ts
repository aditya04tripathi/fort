import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Like {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	userId: Types.ObjectId;

	@Prop({
		type: String,
		enum: ['post', 'comment'],
		required: true,
	})
	targetType: 'post' | 'comment';

	@Prop({ type: Types.ObjectId, required: true, refPath: 'targetType' })
	targetId: Types.ObjectId;
}

export type LikeDocument = HydratedDocument<Like>;
export const LikeSchema = SchemaFactory.createForClass(Like);

LikeSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });
LikeSchema.index({ targetId: 1, targetType: 1 });
LikeSchema.index({ userId: 1, createdAt: -1 });
