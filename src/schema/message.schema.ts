import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// Message Content
@Schema({ _id: false })
class MessageContent {
	@Prop()
	text?: string;

	@Prop()
	mediaUrl?: string;

	@Prop()
	thumbnailUrl?: string;

	@Prop({ type: Types.ObjectId })
	sharedPostId?: Types.ObjectId;

	@Prop({ type: Types.ObjectId })
	sharedStoryId?: Types.ObjectId;
}

const MessageContentSchema = SchemaFactory.createForClass(MessageContent);

// Read Receipt
@Schema({ _id: false })
class ReadReceipt {
	@Prop({ type: Types.ObjectId })
	userId: Types.ObjectId;

	@Prop()
	readAt: Date;
}

const ReadReceiptSchema = SchemaFactory.createForClass(ReadReceipt);

// ===================================
// MESSAGE SCHEMA
// ===================================
@Schema({ timestamps: true })
export class Message {
	@Prop({
		type: Types.ObjectId,
		ref: 'Conversation',
		required: true,
		index: true,
	})
	conversationId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	senderId: Types.ObjectId;

	@Prop()
	senderUsername: string;

	@Prop({
		type: String,
		enum: ['text', 'image', 'video', 'post_share', 'story_reply'],
		default: 'text',
	})
	type: 'text' | 'image' | 'video' | 'post_share' | 'story_reply';

	@Prop({ type: MessageContentSchema })
	content: MessageContent;

	@Prop({ type: Map, of: [Types.ObjectId], default: {} })
	reactions: Map<string, Types.ObjectId[]>;

	@Prop({ type: [ReadReceiptSchema] })
	readBy: ReadReceipt[];

	@Prop({ default: false })
	isDeleted: boolean;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1 });
