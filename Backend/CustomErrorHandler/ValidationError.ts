import customError from './customError'

class validationError extends customError {
    constructor(message: string, property: string) {
        super(message, 400, property)
    }
}
export default validationError
