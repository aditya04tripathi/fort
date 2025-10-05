import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Follow {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	followerId: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	followingId: Types.ObjectId;

	@Prop()
	followerUsername: string;

	@Prop()
	followingUsername: string;

	@Prop({
		type: String,
		enum: ['pending', 'accepted'],
		default: 'accepted',
	})
	status: 'pending' | 'accepted';
}

export type FollowDocument = HydratedDocument<Follow>;
export const FollowSchema = SchemaFactory.createForClass(Follow);

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
FollowSchema.index({ followingId: 1, status: 1 });
