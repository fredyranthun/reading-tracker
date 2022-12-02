#!/usr/bin/env node

import inquirer from 'inquirer';

import './config/module-alias';
import './config/database';
import './config/container';

import { database } from '@/config/database';
import { createBook, listBooks, deleteBook, updateCurrentPage } from '@/config/container';

async function main() {
  while (true) {
    const awnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Create a new book', 'List all books', 'Delete a book', 'Update current Book page', 'Exit'],
      },
    ]);

    switch (awnswer.action) {
      case 'Create a new book':
        await createBook.present();
        break;
      case 'List all books':
        await listBooks.present();
        break;
      case 'Delete a book':
        await deleteBook.present();
        break;
      case 'Update current Book page':
        await updateCurrentPage.present();
        break;
      case 'Exit':
        await database.close();
        process.exit(0);
    }
  }
}

main();
