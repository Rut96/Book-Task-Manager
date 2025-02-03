import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { BadRequestError } from "./error-models";

export class BookModel {
    public id: number;
    public userId: number;
    public title: string;
    public author: string;
    public genre: string;
    public tagId: number;
    public statusId: number;
    public notes: string;
    public imageName: string;
    public image: UploadedFile;

    public constructor(book: any) {
        this.id = book.id;
        this.userId = book.userId;
        this.title = book.title;
        this.author = book.author;
        this.genre = book.genre;
        this.tagId = book.tagId;
        this.statusId = book.statusId;
        this.notes = book.notes;
        this.imageName = book.imageName;
        this.image = book.image;
    }

    private static insertValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        userId: Joi.number().positive().required(),
        title: Joi.string().min(2).max(256).required(),
        author: Joi.string().min(2).max(256).required(),
        genre: Joi.string().min(2).max(100).optional(),
        tagId: Joi.number().positive().required(),
        statusId: Joi.number().positive().required(),
        notes: Joi.string().min(2).max(256).optional(),
        imageName: Joi.string().optional().max(100),
        image: Joi.object().optional()
    });

    public validateInsert(): void {
        const result = BookModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    private static updateValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        userId: Joi.number().positive().required(),
        title: Joi.string().min(2).max(256).optional(),
        author: Joi.string().min(2).max(256).optional(),
        genre: Joi.string().min(2).max(100).optional(),
        tagId: Joi.number().positive().optional(),
        statusId: Joi.number().positive().optional(),
        notes: Joi.string().min(2).max(256).optional(),
        imageName: Joi.string().optional().max(100),
        image: Joi.object().optional()
    });

    public validateUpdate(): void {
        const result = BookModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}
