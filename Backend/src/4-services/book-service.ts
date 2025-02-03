import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { BookModel } from "../3-models/book-model";
import { OkPacketParams } from "mysql2";
import { NotFoundError } from "../3-models/error-models";

class BookService {

    // public async getAllBooks(): Promise<BookModel[]> {
    //     const sql = "select * from books";
    //     const books = await dal.execute(sql);
    //     return books;
    // }

    // public async getOneBook(id: number): Promise<BookModel> {
    //     const sql = `select * from books where id = ?`;
    //     const book = await dal.execute(sql, [id]);
    //     return book;
    // }
    
    public async getAllBooks(): Promise<BookModel[]> {
        const sql = `
            SELECT b.*, 
                   t.name AS tagName, 
                   rs.name AS statusName 
            FROM books b
            LEFT JOIN tags t ON b.tagId = t.id
            LEFT JOIN readingStatus rs ON b.statusId = rs.id`;
        const books = await dal.execute(sql);
        return books;
    }

    public async getOneBook(id: number): Promise<BookModel> {
        const sql = `
            SELECT b.*, 
                   t.name AS tagName, 
                   rs.name AS statusName 
            FROM books b
            LEFT JOIN tags t ON b.tagId = t.id
            LEFT JOIN readingStatus rs ON b.statusId = rs.id
            WHERE b.id = ?`;
        const books = await dal.execute(sql, [id]);
        if (books.length === 0) throw new NotFoundError(`Book id ${id} not found`);
        return books[0];
    }

    public async addBook(book: BookModel): Promise<BookModel> {
        book.validateInsert();

        const sql = `insert into books values(default,?,?,?,?,?,?,?,?)`;
        const imageName = book.image ? await fileSaver.add(book.image) : null;
        const values = [book.userId,book.title,book.author,book.genre,book.tagId,book.statusId,book.notes, imageName];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        book.id = successParams.insertId;
        book.imageName = imageName;
        return book;
    }

    public async updateBook(book: BookModel): Promise<void>{
        book.validateUpdate();

        const sql = `update books set userId = ?, title = ?, author = ?, genre = ?, tagId = ?, statusId = ? notes = ? imageName = ? where id = ?`;
        const oldImageName = await this.getImageName(book.id);
        const newImageName = book.image ? await fileSaver.update(oldImageName, book.image) : oldImageName;
        const values = [book.userId,book.title,book.author,book.genre,book.tagId,book.statusId,book.notes, newImageName, book.id];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        if (successParams.affectedRows === 0) throw new NotFoundError(`id ${book.id} not found`);
    }

    public async deleteBook(id: number) {
        const sql = `delete from books where id = ?`;
        await dal.execute(sql,[id]);
    }

    private async getImageName(id: number): Promise<string> {
        const sql = "select imageName from books where id = ?";
        const vacations = await dal.execute(sql, [id]);
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName;
    }

}

export const bookService = new BookService();