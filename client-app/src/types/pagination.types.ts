export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  data: T;
  pagination: Pagination;
  
  constructor(data: T, pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export class PagingParams {
  constructor(public pageNumber = 1, public pageSize = 2) {
  }
}