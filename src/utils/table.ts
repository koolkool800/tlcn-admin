import { ObjectLiteral } from 'interface/general';

export const getOffset = (nextPage: number, pageSize: number) => {
  nextPage = nextPage <= 0 ? 1 : nextPage;
  pageSize = pageSize < 0 ? 0 : pageSize;
  return (Number(nextPage) - 1) * Number(pageSize);
};

export const getPage = (offset: number, pageSize: number) => {
  return Math.ceil((offset + 1) / pageSize);
};

export const getLimitParam = (paramURL: ObjectLiteral = {}) => {
  return paramURL?.limit ? Number(paramURL?.limit) : 10;
};

export const getPageParam = (paramURL: ObjectLiteral = {}) => {
  return paramURL?.page ? Number(paramURL?.page) : 1;
};
