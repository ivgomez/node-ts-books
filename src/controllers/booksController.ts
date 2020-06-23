import { Request, Response } from "express";
import BookModel, { Book } from "../models/book";

class BooksController {
  public async index(req: Request, res: Response): Promise<void> {
    const books: Book[] = await BookModel.find({});
    res.render("books/index", { title: "Books", books });
  }

  public renderFormBook(req: Request, res: Response): void {
    res.render("books/add", {
      title: "Add a book",
    });
  }
  public async saveBook(req: Request, res: Response) {
    const { title, author, isbn } = req.body;
    const newBook: Book = new BookModel({ title, author, isbn });
    await newBook.save();
    res.redirect("/books");
  }
}

export const booksController = new BooksController();
