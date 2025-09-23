import { JwtPayload } from "jsonwebtoken";
import { IUserSigninPayload, IUserSignupPayload } from "../../types";

export interface IAuthService {
  signup(userData: IUserSignupPayload): Promise<{token : string}>;
  signin(loginData: IUserSigninPayload): Promise<{token : string}>;
  authMe(token: string): JwtPayload | string;
  logout(token: string): Promise<void>;
}

