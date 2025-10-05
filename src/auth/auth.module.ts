import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/utils/strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '../jwt/jwt.module';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		PassportModule,
		JwtModule,
		ConfigModule,
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
