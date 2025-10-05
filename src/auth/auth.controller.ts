import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	registerUser(@Body() userData: RegisterUserDto) {
		return this.authService.registerUser(userData);
	}

	@Post('login')
	loginUser(@Body() loginData: LoginUserDto) {
		return this.authService.loginUser(loginData);
	}
}
