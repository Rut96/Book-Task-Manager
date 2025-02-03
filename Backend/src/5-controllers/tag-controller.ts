import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { TagModel } from "../3-models/tag-model";
import { tagService } from "../4-services/tag-service";

class TagController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/tags", this.getAllTags);
        this.router.get("/tags/:id(\\d+)", this.getOneTag);
        this.router.post("/tags", this.addTag);
        this.router.put("/tags/:id(\\d+)", this.updateTag);
        this.router.delete("/tags/:id(\\d+)", this.deleteTag);
    }

    private async getAllTags(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await tagService.getAllTags();
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async getOneTag(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const data = await tagService.getOneTag(id);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async addTag(request: Request, response: Response, next: NextFunction) {
        try {
            const tag = new TagModel(request.body);
            const data = await tagService.addTag(tag);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async updateTag(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.id = request.params.id;
            const tag = new TagModel(request.body);
            const data = await tagService.updateTag(tag);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async deleteTag(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id
            await tagService.deleteTag(id);
            response.sendStatus(StatusCode.NoContent)
        }
        catch (err: any) { next(err); }
    }

}

export const tagController = new TagController();


