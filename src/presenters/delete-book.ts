import inquirer from 'inquirer';
import { Book } from '@/dtos';
import { DeleteBookUseCase, ListBooksUseCase } from '@/use-cases';

export class DeleteBookPresenter {
  constructor(private readonly deleteBook: DeleteBookUseCase, private readonly listBooks: ListBooksUseCase) {}

  async present() {
    const books = await this.listBooks.execute();

    this.showTable(books.map(this.formatBook));

    const awnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'id',
        message: 'What is the id of the book you want to delete?',
      },
    ]);

    await this.deleteBook.execute(Number(awnswer.id));
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
