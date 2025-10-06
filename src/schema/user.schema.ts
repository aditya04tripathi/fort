import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SHA256 } from 'crypto-js';

@Schema({ _id: false })
class UserProfile {
	@Prop({ trim: true, maxlength: 100, default: '' })
	fullName?: string;

	@Prop({ maxlength: 150, default: '' })
	bio?: string;

	@Prop({ default: '' })
	avatar: string;

	@Prop({ trim: true, default: '' })
	website?: string;

	@Prop({ default: '' })
	phoneNumber?: string;

	@Prop({
		type: String,
		enum: ['male', 'female', 'other', 'prefer_not_to_say'],
		default: 'prefer_not_to_say',
	})
	gender?: string;
}

const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
UserProfileSchema.pre('save', function (next) {
	if (!this.isModified('avatar') || this.avatar === '') {
		const nameWithoutSpacesAndSpecialChars =
			`${this.fullName}${Math.random().toString(36).substring(2, 15)}`
				?.replace(/[^a-zA-Z0-9]/g, '')
				.toLowerCase();
		const hashedName = SHA256(nameWithoutSpacesAndSpecialChars).toString();
		this.avatar = `https://gravatar.com/avatar/${hashedName}?d=identicon`;
	}
	next();
});

@Schema({ _id: false })
class UserCounts {
	@Prop({ default: 0 })
	posts: number;

	@Prop({ default: 0 })
	followers: number;

	@Prop({ default: 0 })
	following: number;
}

const UserCountsSchema = SchemaFactory.createForClass(UserCounts);

@Schema({ timestamps: true })
export class User {
	@Prop({
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		minlength: 3,
		maxlength: 30,
		match: /^[a-zA-Z0-9._]+$/,
	})
	username: string;

	@Prop({
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: /^\S+@\S+\.\S+$/,
	})
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ type: UserProfileSchema })
	profile: UserProfile;

	@Prop({ type: UserCountsSchema })
	counts: UserCounts;

	@Prop({ default: false })
	isVerified: boolean;

	@Prop()
	isPrivate: boolean;

	@Prop()
	lastLoginAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });
UserSchema.index({ 'profile.fullName': 'text', username: 'text' });
