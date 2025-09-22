import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/response.util";
import { IAuthController } from "./auth.interface.controller";
import { StatusCodes } from "http-status-codes";
import { SUCCESS } from "../../constants";
import { IAuthService } from "../../services";

export class AuthController implements IAuthController {
  constructor(private _authServices: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await this._authServices.signup(req.body);
      successResponse(res, StatusCodes.CREATED, SUCCESS.AUTH.SIGNUP_SUCCESS, {
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await this._authServices.signin(req.body);
      
      successResponse(res, StatusCodes.OK, SUCCESS.AUTH.SIGNIN_SUCCESS, {
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
