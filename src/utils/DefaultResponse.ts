import { Response } from 'express';

// Default Response For Every API
export const DefaultResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    total?: number,
    page?: number
) => {
    res.status(statusCode).json({
        status: statusCode === 200 ? 'success' : 'error',
        message,
        data: data || null,
        pagination: total && page ? {
            totalRecords: total, page,
            limit: data.length,
            totalPages: Math.ceil(total / data.length)
        } : null,
    });
};
