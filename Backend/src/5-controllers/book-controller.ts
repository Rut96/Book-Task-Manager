import express, { NextFunction, Request, Response } from "express";
import { bookService } from "../4-services/book-service";
import { BookModel } from "../3-models/book-model";
import { StatusCode } from "../3-models/enums";
import { fileSaver } from "uploaded-file-saver";

class BookController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/books", this.getAllBooks);
        this.router.get("/books/:id(\\d+)", this.getOneBook);

        this.router.post("/books", this.addBook);
        this.router.put("/books", this.updateBook);
        this.router.delete("/books", this.deleteBook);

        this.router.get("/books/images/:imageName", this.getImageFile);
    }

    private async getAllBooks(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await bookService.getAllBooks();
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async getOneBook(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const data = await bookService.getOneBook(id);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async addBook(request: Request, response: Response, next: NextFunction) {
        try {

            request.body.image = request.files?.image;
            const book = new BookModel(request.body);
            const data = await bookService.addBook(book);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async updateBook(request: Request, response: Response, next: NextFunction) {
        try {
            request.body.id = request.params.id;
            request.body.image = request.files?.image;
            const book = new BookModel(request.body);
            const data = await bookService.updateBook(book);
            response.json(data);
        }
        catch (err: any) { next(err); }
    }

    private async deleteBook(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id
            await bookService.deleteBook(id);
            response.sendStatus(StatusCode.NoContent)
        }
        catch (err: any) { next(err); }
    }

    private async getImageFile(request: Request, response: Response, next: NextFunction) {
        try {
            const imageName = request.params.imageName;
            const absolutePath = fileSaver.getFilePath(imageName);
            response.sendFile(absolutePath);
        } catch (err: any) {
            next(err);
        }
    }

}

export const bookController = new BookController();


