import { NextFunction, Request, Response } from "express";
import AuthenticationError from "../CustomErrorHandler/AuthenticationError";
import validationError from "../CustomErrorHandler/ValidationError";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      email?: string | JwtPayload;
    }
  }
}

function authorizationCheck(req: Request, res: Response, next: NextFunction) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return next(new AuthenticationError("No token found", "missing token"));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
      return next(new validationError("Not a valid token", "token"));
    }

    req.email = decoded as JwtPayload;
    next();
  });
}

export default authorizationCheck;
