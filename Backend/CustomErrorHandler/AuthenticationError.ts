import customError from "./customError";

class AuthenticationError extends customError{
  constructor(message:string,property:string){
    super(message,401,property)
  }
}
export default AuthenticationError
