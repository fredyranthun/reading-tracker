import { Book } from '../dtos';
import { BookRepository } from '../repositories/book';

export class ListBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.bookRepository.list();

    return books;
  }
}
