export interface Paginated<T> {
    data: T[];
    total: number;
    skip: number;
    limit: number;
}

export function paginationFrom(
    paginatedData: Paginated<unknown>,
): Omit<Paginated<unknown>, 'data'> {
    return {
        total: paginatedData.total,
        skip: paginatedData.skip,
        limit: paginatedData.limit,
    };
}
