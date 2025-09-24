import { IUserTokenPayload } from "../user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IUserTokenPayload;
      userId?: string; 
    }
  }
}
