export type CreateBookRequest = {
  title: string;
  author: string;
  startDate: string;
  currentPage: number;
  totalPages: number;
};

export type Book = CreateBookRequest & {
  id: number;
};

export type BookRow = {
  id: number;
  title: string;
  author: string;
  start_date: string;
  current_page: number;
  total_pages: number;
};
