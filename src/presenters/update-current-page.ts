import { Book } from '@/dtos';
import { ListBooksUseCase, UpdateCurrentPageUseCase } from '@/use-cases';
import inquirer from 'inquirer';

export class UpdateCurrentPagePresenter {
  constructor(private updateCurrentPage: UpdateCurrentPageUseCase, private listBooks: ListBooksUseCase) {}

  async present(): Promise<void> {
    const books = await this.listBooks.execute();

    this.showTable(books.map(this.formatBook));

    const awnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'What is the id of the book you want to update?',
      },
      {
        type: 'input',
        name: 'currentPage',
        message: 'What is the current page of the book?',
      },
    ]);

    await this.updateCurrentPage.execute(Number(awnswer.id), Number(awnswer.currentPage));
  }

  private formatBook(book: Book) {
    return {
      id: book.id,
      Title: book.title,
      Author: book.author,
    };
  }

  private showTable(array: Array<any>) {
    const transformed = array.reduce((acc, { id, ...x }) => {
      acc[id] = x;
      return acc;
    }, {});

    console.table(transformed);
  }
}
