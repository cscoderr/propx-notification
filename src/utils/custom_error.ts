/**
 * Create base error class for all request error
 * @param {string} message error message for the request response
 */
abstract class BaseError extends Error {
    abstract statusCode: number
    constructor(message: string = 'An error occur') {
        super(message)
    }
}

/**
 * Create custom error for bad request
 * @param {string} message error message for the request response
 * @param {number} statusCode HTTP status code. default to 400
 */
export class BadRequestError extends BaseError {
    statusCode: number
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode
    }
}

/**
 * Create custom error for unauthorized request
 * @param {string} message error message for the request response
 * @param {number} statusCode HTTP status code. default to 401
 */
export class UnathorizedError extends BaseError {
    statusCode: number
    constructor(message:string, statusCode: number = 401) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode
    }
}