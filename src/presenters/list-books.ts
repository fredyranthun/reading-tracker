import { Book } from 'dtos';
import { ListBooksUseCase } from '../use-cases';

export class ListBooksPresenter {
  constructor(private readonly listBooks: ListBooksUseCase) {}

  async present() {
    const books = await this.listBooks.execute();

    console.table(books.map(this.formatBook));
  }

  private formatBook(book: Book) {
    return {
      id: book.id,
      Title: book.title,
      Author: book.author,
      'Start date': new Date(book.startDate).toLocaleDateString(),
      'Current page': book.currentPage,
      'Total pages': book.totalPages,
    };
  }
}
