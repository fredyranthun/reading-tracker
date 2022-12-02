import { Database } from 'sqlite3';
import { Book, BookRow, CreateBookRequest } from '../dtos';

export class BookRepository {
  constructor(private database: Database) {}

  async create({ title, author, startDate, currentPage, totalPages }: CreateBookRequest): Promise<void> {
    this.database.run('INSERT INTO books (title, author, start_date, current_page, total_pages) VALUES (?, ?, ?, ?, ?)', [
      title,
      author,
      startDate,
      currentPage,
      totalPages,
    ]);
  }

  async list(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      this.database.all('SELECT * FROM books', (err, rows) => {
        if (err) {
          reject(err);
        }

        const books = rows.map((row) => this.mapRowToBook(row as BookRow));

        resolve(books);
      });
    });
  }

  private mapRowToBook(row: BookRow): Book {
    return {
      id: row.id,
      title: row.title,
      author: row.author,
      startDate: row.start_date,
      currentPage: row.current_page,
      totalPages: row.total_pages,
    };
  }
}
