import { IUserModel } from "../models";
import { IUserResponse } from "../types";

export const mapUserResponse = (user: IUserModel): IUserResponse => {
  return {
    id: user?._id?.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    isOrganizer: Boolean(user.organization),
    organization: user.organization,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
