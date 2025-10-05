import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsString()
	fullName: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}

export class LoginUserDto {
	@IsNotEmpty()
	@IsString()
	usernameOrEmail: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
