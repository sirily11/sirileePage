export interface Author {
  username: string;
}

export interface Language {
  language: string;
}

export interface Category {
  id: number;
  category: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  post_category: Category;
  post_language: Language;
  author: Author;
  posted_time: string;
  image_url: string;
  cover_color: Color[]
}

export interface Color{
  red: number;
  green: number;
  blue: number;
}

export interface FetchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}
