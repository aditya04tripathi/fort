import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schema/user.schema';
import type { TDocument } from 'src/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		config: ConfigService,
		@InjectModel(User.name) private userModel: Model<User>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET')!,
		});
	}

	async validate(payload: {
		sub: string;
		email: string;
		iat: number;
	}): Promise<Omit<TDocument<User>, 'passwordHash'>> {
		const user: TDocument<User> | null = await this.userModel.findById(
			payload.sub,
		);

		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		const { passwordHash, ...userWithoutPassword } = user.toObject();
		return userWithoutPassword;
	}
}
