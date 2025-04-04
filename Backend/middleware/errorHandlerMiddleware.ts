import { Response, Request, NextFunction } from "express";
import customError from "../CustomErrorHandler/customError";
export default function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof customError) {
    res.status(err.statusCode).json({
      message: err.message,
      name: err.name,
      property: err.property,
    });
    return
  }
  console.log(err.name)
console.log("error handler middleware")
   res.status(500).json({
    message: "Something went wrong",
  });
}
