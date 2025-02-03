import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { ReadingStatusModel } from "../3-models/reading-status-model";
import { readingStatusService } from "../4-services/reading-status-service";

class ReadingStatusController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/reading-status", this.getAllStatuses);
        this.router.get("/reading-status/:id(\\d+)", this.getOneStatus);
        this.router.post("/reading-status", this.addStatus);
        this.router.put("/reading-status/:id(\\d+)", this.updateStatus);
        this.router.delete("/reading-status/:id(\\d+)", this.deleteStatus);
    }

    private async getAllStatuses(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await readingStatusService.getAllStatuses();
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async getOneStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const data = await readingStatusService.getOneStatus(id);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async addStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const status = new ReadingStatusModel(request.body);
            const data = await readingStatusService.addStatus(status)
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async updateStatus(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.id = request.params.id;
            const status = new ReadingStatusModel(request.body);
            const data = await readingStatusService.updateStatus(status);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async deleteStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id
            await readingStatusService.deleteStatus(id);
            response.sendStatus(StatusCode.NoContent)
        }
        catch (err: any) { next(err); }
    }

}

export const readingStatusController = new ReadingStatusController();


