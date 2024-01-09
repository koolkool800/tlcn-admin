export type BaseFilterType = {
  sortBy?: string;
  limit: number;
  offset?: number;
  length: number;
  page: number;
};

export type BaseModelType = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ObjectLiteral = {
  [key: string]: any;
};

export type PaginateType = BaseFilterType & ObjectLiteral;

export const initFilter: PaginateType = {
  sortBy: 'id:desc',
  limit: 10,
  offset: 0,
  length: 0,
  page: 1,
};
