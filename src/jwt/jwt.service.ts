import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Types } from 'mongoose';
import type { User } from 'src/schema/user.schema';
import type { TDocument } from 'src/types';

export interface JwtPayload {
	sub: string;
	email: string;
	iat?: number;
	exp?: number;
}

@Injectable()
export class CustomJwtService {
	constructor(private readonly jwtService: JwtService) {}

	async generateToken(user: TDocument<User>): Promise<string> {
		const payload: JwtPayload = {
			sub: (user._id as Types.ObjectId).toString(),
			email: user.email,
		};

		return this.jwtService.sign(payload);
	}

	async verifyToken(token: string): Promise<JwtPayload> {
		return this.jwtService.verify(token);
	}

	async decodeToken(token: string): Promise<JwtPayload | null> {
		try {
			return this.jwtService.decode(token);
		} catch {
			return null;
		}
	}
}
