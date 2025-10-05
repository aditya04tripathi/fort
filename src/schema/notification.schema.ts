import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// ===================================
// NOTIFICATION SCHEMA
// ===================================
@Schema({ timestamps: true })
export class Notification {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	recipientId: Types.ObjectId;

	@Prop({
		type: String,
		enum: [
			'like',
			'comment',
			'follow',
			'mention',
			'story_reply',
			'follow_request',
		],
		required: true,
	})
	type:
		| 'like'
		| 'comment'
		| 'follow'
		| 'mention'
		| 'story_reply'
		| 'follow_request';

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	actorId: Types.ObjectId;

	@Prop()
	actorUsername: string;

	@Prop()
	actorAvatar: string;

	@Prop({ type: Types.ObjectId, ref: 'Post' })
	postId?: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Comment' })
	commentId?: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'Story' })
	storyId?: Types.ObjectId;

	@Prop({ required: true })
	message: string;

	@Prop({ default: false, index: true })
	isRead: boolean;
}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.index({ recipientId: 1, createdAt: -1 });
NotificationSchema.index({ recipientId: 1, isRead: 1 });
NotificationSchema.index(
	{ createdAt: 1 },
	{ expireAfterSeconds: 30 * 24 * 60 * 60 },
);
