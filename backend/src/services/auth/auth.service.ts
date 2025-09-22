import { StatusCodes } from "http-status-codes";
import { ERROR } from "../../constants";
import { IUserRepository } from "../../repositories";
import { IUserSigninPayload, IUserSignupPayload } from "../../types";
import { comparePassword, createHttpsError, generateToken, hashPassword } from "../../utils";
import { IAuthService } from "./auth.interface.service";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signup(userData: IUserSignupPayload): Promise<{ token: string }> {
    const existingUser = await this.userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw createHttpsError(StatusCodes.CONFLICT, ERROR.USER.ALREADY_EXISTS);
    }
    userData.password = await hashPassword(userData.password);
    const newUser = await this.userRepository.createUser(userData);

    const payload = { id: newUser._id.toString(), role: newUser.role };

    const token = generateToken(payload);
    return { token };
  }

  async signin(loginData: IUserSigninPayload): Promise<{ token: string }> {
    const user = await this.userRepository.findUserByEmail(loginData.email);
    if (!user) {
      throw createHttpsError(StatusCodes.NOT_FOUND, ERROR.USER.NOT_FOUND);
    }
    const isValid = await comparePassword(loginData.password, user.password);
    if (!isValid) {
      throw createHttpsError(StatusCodes.UNAUTHORIZED, ERROR.USER.INVALID_CREDENTIALS);
    }
    
    if (!user.isActive) {
      throw createHttpsError(StatusCodes.FORBIDDEN, ERROR.USER.INACTIVE_ACCOUNT);
    }

    const payload = { id: user._id.toString(), role: user.role };
    const token = generateToken(payload);
    return { token };
  }
}
