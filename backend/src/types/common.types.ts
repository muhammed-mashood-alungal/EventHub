export interface IPagination<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T[];
}
export interface IPaginationFilters {
    page: number;
    limit: number;
}
export interface IFilterOptions {
  [key: string]: string | number | boolean;
}
