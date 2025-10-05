import { Module, Global } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomJwtService } from './jwt.service';

@Global()
@Module({
	imports: [
		NestJwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
			}),
			inject: [ConfigService],
		}),
	],
	providers: [CustomJwtService],
	exports: [CustomJwtService, NestJwtModule],
})
export class JwtModule {}
