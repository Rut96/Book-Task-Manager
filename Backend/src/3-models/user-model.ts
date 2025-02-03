import { UploadedFile } from "express-fileupload";
import { RoleModel } from "./role-model";
import Joi from "joi";
import { BadRequestError } from "./error-models";

export class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;
    public imageName: string;
    public image: UploadedFile;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName.trim();
        this.lastName = user.lastName.trim();
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.imageName = user.imageName;
        this.image = user.image;
    }

    private static registerNewUser = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().required().min(2).max(100),
        password: Joi.string().required().min(5).max(256),
        roleId: Joi.number().positive(),
        imageName: Joi.string().optional().max(100),
        image: Joi.object().optional()
    });

    public validateRegister(): void {
        const result = UserModel.registerNewUser.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    private static updateUser = Joi.object({
        firstName: Joi.string().optional().min(2).max(50),
        lastName: Joi.string().optional().min(2).max(50),
        email: Joi.string().optional().min(2).max(100),
        password: Joi.string().optional().min(5).max(256),
        roleId: Joi.number().positive(),
        imageName: Joi.string().optional().max(100),
        image: Joi.object().optional()
    });

    public validateUpdate(): void {
        const result = UserModel.updateUser.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

}