import { StatusCodes } from "http-status-codes";
import { ERROR } from "../../constants";
import { IUserRepository } from "../../repositories";
import {
  IUser,
  IUserResponse,
  IUserSigninPayload,
  IUserSignupPayload,
} from "../../types";
import {
  blacklistToken,
  comparePassword,
  createHttpsError,
  generateToken,
  hashPassword,
  verifyToken,
} from "../../utils";
import { IAuthService } from "./auth.interface.service";
import { mapUserResponse } from "../../mappers/user.mapper";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signup(
    userData: IUserSignupPayload
  ): Promise<{ token: string; user: IUserResponse }> {
    const existingUser = await this.userRepository.findUserByEmail(
      userData.email
    );
    if (existingUser) {
      throw createHttpsError(StatusCodes.CONFLICT, ERROR.USER.ALREADY_EXISTS);
    }
    userData.password = await hashPassword(userData.password);
    const newUser = await this.userRepository.createUser(userData);

    const payload = { id: newUser._id.toString(), role: newUser.role };

    const token = generateToken(payload);
    return { token, user: mapUserResponse(newUser) };
  }

  async signin(
    loginData: IUserSigninPayload
  ): Promise<{ token: string; user: IUserResponse }> {
    const user = await this.userRepository.findUserByEmail(loginData.email);
    if (!user) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.USER.NOT_FOUND);
    }
    const isValid = await comparePassword(loginData.password, user.password);
    if (!isValid) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR.USER.INVALID_CREDENTIALS
      );
    }

    if (!user.isActive) {
      throw createHttpsError(
        StatusCodes.FORBIDDEN,
        ERROR.USER.INACTIVE_ACCOUNT
      );
    }
    const payload = { id: user._id.toString(), role: user.role };
    const token = generateToken(payload);
    return { token, user: mapUserResponse(user) };
  }

  async authMe(token: string): Promise<IUserResponse | null> {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR.USER.INVALID_CREDENTIALS
      );
    }
    const user = await this.userRepository.findUserById(
      (decoded as { id: string }).id
    );
    if (!user?.isActive) {
      throw createHttpsError(
        StatusCodes.FORBIDDEN,
        ERROR.USER.INACTIVE_ACCOUNT
      );
    }
    return mapUserResponse(user);
  }

  async logout(token: string): Promise<void> {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw createHttpsError(
        StatusCodes.UNAUTHORIZED,
        ERROR.USER.INVALID_CREDENTIALS
      );
    }
    await blacklistToken(token);
  }
}
