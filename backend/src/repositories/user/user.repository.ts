import { IUserModel, User } from "../../models";
import { BaseRepository } from "../base.repository";
import { toObjectId } from "../../utils";
import { IUserRepository } from "./user.interface.repository";
import { IUserSignupPayload } from "../../types";

export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async findUserById(id: string): Promise<IUserModel | null> {
    return this.findById(toObjectId(id));
  }

  async findUserByEmail(email: string): Promise<IUserModel | null> {
    return this.findOne({ email });
  }

  async createUser(user: IUserSignupPayload): Promise<IUserModel> {
    return this.create(user);
  }
}
