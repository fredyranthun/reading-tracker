import { BookRepository } from '@/repositories';

export class UpdateCurrentPageUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: number, currentPage: number): Promise<void> {
    const book = await this.bookRepository.find(id);
    const oldCurrentPage = book.currentPage;
    const pagesRead = currentPage - oldCurrentPage;

    await this.bookRepository.update(id, currentPage);

    await this.bookRepository.createReading(id, new Date().toISOString(), pagesRead, '0m');
  }
}
