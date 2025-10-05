import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import type { TDocument } from 'src/types';

export const GetUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): TDocument<User> => {
		const request = ctx.switchToHttp().getRequest();

		return request.user as TDocument<User>;
	},
);
