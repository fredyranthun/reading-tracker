#!/usr/bin/env node

import './config/database';
import { database } from './config/database';
import inquirer from 'inquirer';

import { BookRepository } from './repositories';
import { CreateBookUseCase, ListBooksUseCase } from './use-cases';
import { ListBooksPresenter } from './presenters';

const bookRepository = new BookRepository(database);
const createBookUseCase = new CreateBookUseCase(bookRepository);
const listBooksUseCase = new ListBooksUseCase(bookRepository);
const listBooksPresenter = new ListBooksPresenter(listBooksUseCase);

async function main() {
  while (true) {
    const awnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Create a new book', 'List all books', 'Exit'],
      },
    ]);

    if (awnswer.action === 'List all books') {
      await listBooksPresenter.present();
    }

    if (awnswer.action === 'Create a new book') {
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
          name: 'startDate',
          message: 'What is the start date of the book?',
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

      await createBookUseCase.execute({
        title: awnswer.title,
        author: awnswer.author,
        startDate: new Date().toISOString(),
        currentPage: Number(awnswer.currentPage),
        totalPages: Number(awnswer.totalPages),
      });
    }

    if (awnswer.action === 'Exit') {
      break;
    }
  }

  database.close();
}

main();
