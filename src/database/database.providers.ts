import * as mongoose from 'mongoose';
import { DATABASE_PROVIDER, DATABASE_URL } from 'src/constants';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER,
    useFactory: (): Promise<typeof mongoose> => {
      return mongoose.connect(DATABASE_URL);
    },
  },
];
