import { IUserSigninPayload, IUserSignupPayload } from "../../types";

export interface IAuthService {
  signup(userData: IUserSignupPayload): Promise<{token : string}>;
  signin(loginData: IUserSigninPayload): Promise<{token : string}>;
}