import { Category } from './post';

export interface CategoryResult {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Category[]
}