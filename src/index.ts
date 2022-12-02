#!/usr/bin/env node

import inquirer from 'inquirer';

import './config/module-alias';
import './config/database';
import './config/container';

import { database } from '@/config/database';
import { createBook, listBooks } from '@/config/container';

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
      await listBooks.present();
    }

    if (awnswer.action === 'Create a new book') {
      await createBook.present();
    }

    if (awnswer.action === 'Exit') {
      break;
    }
  }

  database.close();
}

main();
