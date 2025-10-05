import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { TDocument } from 'src/types';
import { User } from 'src/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CustomJwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private jwtService: CustomJwtService,
	) {}

	async validateUser(
		username: string,
		password: string,
	): Promise<TDocument<User> | null> {
		const user = await this.userModel.findOne({
			$or: [{ username }, { email: username }],
		});
		if (user && (await bcrypt.compare(password, user.passwordHash))) {
			return user;
		}
		return null;
	}

	async registerUser(userData: RegisterUserDto) {
		try {
			const userExists = await this.userModel.findOne({
				username: userData.username,
				$or: [{ email: userData.email }],
			});
			if (userExists) {
				throw new HttpException(
					'Username or email already in use',
					HttpStatus.CONFLICT,
				);
			}

			const passwordHash = await bcrypt.hash(userData.password, 10);
			const newUser = await this.userModel.create({
				username: userData.username,
				email: userData.email,
				passwordHash,
				profile: {
					fullName: userData.fullName || '',
				},
				counts: {},
			});
			if (!newUser) {
				throw new HttpException(
					'Failed to create user',
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}

			return newUser;
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'An error occurred during registration',
				(error as HttpException).getStatus() ||
					HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async loginUser(loginData: LoginUserDto) {
		try {
			const user = await this.userModel.findOne({
				$or: [
					{ username: loginData.usernameOrEmail },
					{ email: loginData.usernameOrEmail },
				],
			});
			if (!user) {
				throw new HttpException(
					'Invalid username/email or password',
					HttpStatus.UNAUTHORIZED,
				);
			}

			const passwordValid = await bcrypt.compare(
				loginData.password,
				user.passwordHash,
			);
			if (!passwordValid) {
				throw new HttpException(
					'Invalid username/email or password',
					HttpStatus.UNAUTHORIZED,
				);
			}

			const token = await this.jwtService.generateToken(user);
			return {
				user,
				token,
			};
		} catch (error) {
			throw new HttpException(
				(error as Error).message || 'An error occurred during login',
				(error as HttpException).getStatus() || 500,
			);
		}
	}
}
