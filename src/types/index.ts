import { Document } from 'mongoose';

export type TDocument<T> = T & Document;

export type ApiResponseType<T, E> = {
	okay: boolean;
	message?: T;
	error?: E;
	statusCode: number;
};
