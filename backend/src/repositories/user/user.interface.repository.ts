import { IUserModel } from "../../models";
import { IUserSignupPayload } from "../../types";

export interface IUserRepository {
  findUserById(id: string): Promise<IUserModel | null> 
  findUserByEmail(email: string): Promise<IUserModel | null>;
  createUser(user: IUserSignupPayload): Promise<IUserModel>;
}
