import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/response.util";
import { IAuthController } from "./auth.interface.controller";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { SUCCESS } from "../../constants";
import { IAuthService } from "../../services";

export class AuthController implements IAuthController {
  constructor(private _authServices: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await this._authServices.signup(req.body);
      successResponse(res, StatusCodes.CREATED, SUCCESS.USER.SIGNUP_SUCCESS, {
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token , user} = await this._authServices.signin(req.body);

      successResponse(res, StatusCodes.OK, SUCCESS.USER.SIGNIN_SUCCESS, {
        token,
        user
      });
    } catch (error) {
      next(error);
    }
  }

  async authMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1]!;
      const user = await this._authServices.authMe(token);
      successResponse(res, StatusCodes.OK, ReasonPhrases.OK ,{
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1]!;
      await this._authServices.logout(token);
      successResponse(
        res,
        StatusCodes.NO_CONTENT,
        SUCCESS.USER.LOGOUT_SUCCESS
      );
    } catch (error) {
      next(error);
    }
  }
}
