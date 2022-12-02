import path from 'node:path';

import { Database } from 'sqlite3';

const dbPath = path.join(__dirname, '..', '..', 'db', 'db.sqlite3');

const database = new Database(dbPath);

database.serialize(() => {
  database.run(
    'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, start_date DATE, current_page INTEGER, total_pages INTEGER)',
  );

  database.run(
    'CREATE TABLE IF NOT EXISTS readings (id INTEGER PRIMARY KEY AUTOINCREMENT, book_id INTEGER, date DATE, pages_read INTEGER, time TEXT, FOREIGN KEY(book_id) REFERENCES books(id))',
  );

  console.log('Database initialized');
});

export { database };
