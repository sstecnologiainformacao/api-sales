import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { pagination,  } from 'typeorm-pagination'
import 'reflect-metadata';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import '@shared/container';
import upload from '@config/upload';
import rateLimiter from './routes/middleware/rateLimiter';


const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(upload.directory));
app.use(routes);
app.use(errors());

//middleware to handle all errors when the type is AppError.
app.use((
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) =>{
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    console.log(error);

    return response.status(500).json( {
        status: 'error',
        message: 'Internal server error.'
    })
});

app.listen(3333, () => {
    console.log('Server started on port 3333!')
})

