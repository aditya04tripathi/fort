import * as mongoose from 'mongoose';
import { DATABASE_PROVIDER } from 'src/constants';

export const databaseProviders = [
	{
		provide: DATABASE_PROVIDER,
		useFactory: (): Promise<typeof mongoose> => {
			return mongoose.connect(process.env.DATABASE_URL!);
		},
	},
];
