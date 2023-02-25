export interface PageWrapperInterface<T> {
    pageItems: T[];
    pageItemsCount: number;
    currentPage: number;
    pagesCount: number;
    itemsPerPage: number;
    totalItems: number;
}