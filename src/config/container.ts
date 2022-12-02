import { database } from './database';
// import { BookRepository } from '@/repositories';
import { CreateBookUseCase, ListBooksUseCase } from '@/use-cases';
import { ListBooksPresenter, CreateBookPresenter } from '@/presenters';
import { BookRepository } from '@/repositories';

const bookRepository = new BookRepository(database);

const createBookUseCase = new CreateBookUseCase(bookRepository);

const listBooksUseCase = new ListBooksUseCase(bookRepository);

export const listBooks = new ListBooksPresenter(listBooksUseCase);

export const createBook = new CreateBookPresenter(createBookUseCase);
