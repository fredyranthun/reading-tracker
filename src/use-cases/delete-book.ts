import { BookRepository } from '@/repositories';

export class DeleteBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
