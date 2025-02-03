import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { BookModel } from "../Models/BookModel";

class BookService {

    public async getAllBooks(): Promise<BookModel[]> {
        const response = await axios.get(appConfig.booksUrl);
        const books = response.data;
        return books;
    }

    public async getOneBook(id: number): Promise<BookModel> {
        const response = await axios.get(appConfig.booksUrl + id);
        const book = response.data;
        return book;
    }

    public async addBook(book: BookModel): Promise<BookModel> {

        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.post(appConfig.booksUrl, book, options);
        return response.data;
    }

    public async updateBook(book: BookModel): Promise<BookModel> {

        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.put(appConfig.booksUrl, book, options);
        return response.data;
    }

    public async deleteBook(id: number): Promise<BookModel> {
        const response = await axios.delete(appConfig.booksUrl + id);
        return response.data;
    }

}

export const bookService = new BookService();

