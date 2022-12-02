import { CreateBookRequest } from '../dtos';
import { BookRepository } from '../repositories/book';

export class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute({ title, author, startDate, currentPage, totalPages }: CreateBookRequest): Promise<void> {
    await this.bookRepository.create({
      title,
      author,
      startDate,
      currentPage,
      totalPages,
    });
  }
}
