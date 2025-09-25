import { JwtPayload } from "jsonwebtoken";
import { IUserResponse, IUserSigninPayload, IUserSignupPayload } from "../../types";

export interface IAuthService {
  signup(userData: IUserSignupPayload): Promise<{token : string , user : IUserResponse}>;
  signin(loginData: IUserSigninPayload): Promise<{token : string , user : IUserResponse}>;
  authMe(token: string): JwtPayload | string;
  logout(token: string): Promise<void>;
}

