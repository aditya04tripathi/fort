import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

// Conversation Participant
@Schema({ _id: false })
class Participant {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	userId: Types.ObjectId;

	@Prop()
	username: string;

	@Prop()
	avatar: string;

	@Prop()
	lastReadAt: Date;
}

const ParticipantSchema = SchemaFactory.createForClass(Participant);

// Last Message (Embedded in Conversation)
@Schema({ _id: false })
class LastMessage {
	@Prop()
	text: string;

	@Prop({ type: Types.ObjectId })
	senderId: Types.ObjectId;

	@Prop()
	createdAt: Date;
}

const LastMessageSchema = SchemaFactory.createForClass(LastMessage);

// ===================================
// CONVERSATION SCHEMA
// ===================================
@Schema({ timestamps: true })
export class Conversation {
	@Prop({ type: [ParticipantSchema], required: true })
	participants: Participant[];

	@Prop({ default: false })
	isGroup: boolean;

	@Prop()
	groupName?: string;

	@Prop()
	groupAvatar?: string;

	@Prop({ type: LastMessageSchema })
	lastMessage?: LastMessage;
}

export type ConversationDocument = HydratedDocument<Conversation>;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.index({ 'participants.userId': 1 });
ConversationSchema.index({ updatedAt: -1 });
