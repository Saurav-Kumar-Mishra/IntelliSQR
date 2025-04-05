class customError extends Error {
    statusCode: number
    property: string
    constructor(message: string, statusCode: number, property: string) {
        super(message)
        this.statusCode = statusCode
        this.name = this.constructor.name
        this.property = property
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
export default customError
