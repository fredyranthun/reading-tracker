import inquirer from 'inquirer';
import { CreateBookUseCase } from '@/use-cases';

export class CreateBookPresenter {
  constructor(private readonly createBook: CreateBookUseCase) {}

  async present() {
    const awnswer = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the book?',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Who is the author of the book?',
      },
      {
        type: 'input',
        name: 'currentPage',
        message: 'What is the current page of the book?',
      },
      {
        type: 'input',
        name: 'totalPages',
        message: 'What is the total pages of the book?',
      },
    ]);

    await this.createBook.execute({
      title: awnswer.title,
      author: awnswer.author,
      startDate: new Date().toISOString(),
      currentPage: Number(awnswer.currentPage),
      totalPages: Number(awnswer.totalPages),
    });

    console.log(`Book ${awnswer.title} created`);
  }
}
