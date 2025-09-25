export interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface IPaginationFilters {
  page: number;
  limit: number;
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginationedResponse<T> {
  pagination: IPagination;
  data: T[];
}
