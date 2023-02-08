// noinspection JSUnusedLocalSymbols

import ApiError from '../exceptions/ApiError.js';

export default function (error, request, response, next) {
    console.log(error);
    if (error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, errors: error.errors});
    }
    return response.status(500).json({message: 'Непредвиденная ошибка'});
}