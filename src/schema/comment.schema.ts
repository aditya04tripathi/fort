import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
class CommentCounts {
	@Prop({ default: 0 })
	likes: number;

	@Prop({ default: 0 })
	replies: number;
}

const CommentCountsSchema = SchemaFactory.createForClass(CommentCounts);

@Schema({ timestamps: true })
export class Comment {
	@Prop({ type: Types.ObjectId, ref: 'Post', required: true, index: true })
	postId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	userId: Types.ObjectId;

	@Prop({ required: true })
	username: string;

	@Prop()
	userAvatar: string;

	@Prop({ required: true, maxlength: 2200 })
	text: string;

	@Prop({ type: Types.ObjectId, ref: 'Comment', default: null, index: true })
	parentCommentId: Types.ObjectId | null;

	@Prop([{ type: String, lowercase: true }])
	mentions: string[];

	@Prop({ type: CommentCountsSchema })
	counts: CommentCounts;
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ postId: 1, createdAt: -1 });
CommentSchema.index({ parentCommentId: 1, createdAt: -1 });
CommentSchema.index({ userId: 1, createdAt: -1 });
