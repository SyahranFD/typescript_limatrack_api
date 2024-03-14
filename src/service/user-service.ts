import {
    CreateUserRequest,
    LoginUserRequest,
    toUserResponse,
    UpdateUserRequest,
    UserResponse
} from "../model/model-user";
import {prismaClient} from "../application/database";
import {UserValidation} from "../validation/user-validation";
import {Validation} from "../validation/validation";
import bcrypt from "bcrypt";
import {ResponseError} from "../error/response-error";
import {v4 as uuid} from "uuid";
import {logger} from "../application/logging";
import {User} from "@prisma/client";

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        });

        if (totalUserWithSameEmail != 0) {
            throw new ResponseError(409, 'Email sudah terdaftar');
        }

        registerRequest.id = 'user-' + uuid();
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toUserResponse(user);
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        logger.debug("isPasswordValid: " + isPasswordValid);
        logger.debug("user.password: " + user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "password is wrong");
        }

        user = await prismaClient.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: uuid()
            }
        });

        const response = toUserResponse(user);
        response.token = user.token!;
        return response;
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: updateRequest
        });

        return toUserResponse(result);
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: {
                token: null
            }
        });

        return toUserResponse(result);
    }
}
