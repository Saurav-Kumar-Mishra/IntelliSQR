import customError from './customError'

class ConflictError extends customError {
    constructor(message: string, property: string) {
        super(message, 409, property)
    }
}

export default ConflictError
