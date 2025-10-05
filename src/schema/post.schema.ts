import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ _id: false })
class Coordinates {
	@Prop()
	latitude: number;

	@Prop()
	longitude: number;
}

const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

@Schema({ _id: false })
class Location {
	@Prop()
	name?: string;

	@Prop({ type: CoordinatesSchema })
	coordinates?: Coordinates;
}

const LocationSchema = SchemaFactory.createForClass(Location);

@Schema({ _id: false })
class PostCounts {
	@Prop({ default: 0 })
	likes: number;

	@Prop({ default: 0 })
	comments: number;

	@Prop({ default: 0 })
	shares: number;
}

const PostCountsSchema = SchemaFactory.createForClass(PostCounts);

@Schema({ _id: true })
class RecentComment {
	@Prop({ type: Types.ObjectId })
	userId: Types.ObjectId;

	@Prop()
	username: string;

	@Prop()
	userAvatar: string;

	@Prop()
	text: string;

	@Prop()
	createdAt: Date;
}

const RecentCommentSchema = SchemaFactory.createForClass(RecentComment);

@Schema({ _id: false })
class Media {
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

	@Prop()
	width?: number;

	@Prop()
	height?: number;

	@Prop()
	duration?: number;
}

const MediaSchema = SchemaFactory.createForClass(Media);

@Schema({ timestamps: true })
export class Post {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
	userId: Types.ObjectId;

	@Prop({ required: true })
	username: string;

	@Prop()
	userAvatar: string;

	@Prop({ type: [MediaSchema], required: true })
	media: Media[];

	@Prop({ maxlength: 2200 })
	caption: string;

	@Prop({ type: LocationSchema })
	location?: Location;

	@Prop([{ type: String, lowercase: true }])
	hashtags: string[];

	@Prop([{ type: String, lowercase: true }])
	mentions: string[];

	@Prop({ type: PostCountsSchema })
	counts: PostCounts;

	@Prop({ type: [RecentCommentSchema] })
	recentComments: RecentComment[];

	@Prop({ default: true })
	isCommentsEnabled: boolean;

	@Prop({ default: true })
	isLikesVisible: boolean;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({ userId: 1, createdAt: -1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ hashtags: 1 });
PostSchema.index({ 'location.name': 1 });
PostSchema.index({ mentions: 1 });
