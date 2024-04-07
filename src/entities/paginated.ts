export interface Paginated<T> {
    data: T[];
    total: number;
    skip: number;
    limit: number;
}
