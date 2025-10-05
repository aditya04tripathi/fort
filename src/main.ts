import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './utils/filters/global-exception.filter';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalInterceptors(new ResponseInterceptor());

	SwaggerModule.setup('docs', app, require('./swagger/swagger.json'));

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			enableDebugMessages: process.env.NODE_ENV !== 'production',
		}),
	);

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
