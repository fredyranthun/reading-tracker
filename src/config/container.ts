import { database } from './database';
import { BookRepository } from '@/repositories';
import { CreateBookUseCase, DeleteBookUseCase, ListBooksUseCase, UpdateCurrentPageUseCase } from '@/use-cases';
import { ListBooksPresenter, CreateBookPresenter, DeleteBookPresenter, UpdateCurrentPagePresenter } from '@/presenters';

const bookRepository = new BookRepository(database);

const createBookUseCase = new CreateBookUseCase(bookRepository);

const listBooksUseCase = new ListBooksUseCase(bookRepository);

const deleteBookUseCase = new DeleteBookUseCase(bookRepository);

const updateCurrentPageUseCase = new UpdateCurrentPageUseCase(bookRepository);

export const listBooks = new ListBooksPresenter(listBooksUseCase);

export const createBook = new CreateBookPresenter(createBookUseCase);

export const deleteBook = new DeleteBookPresenter(deleteBookUseCase, listBooksUseCase);

export const updateCurrentPage = new UpdateCurrentPagePresenter(updateCurrentPageUseCase, listBooksUseCase);
