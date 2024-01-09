import { AxiosError, AxiosResponse } from 'axios';

export type ResponseModel<T> = {
  result: boolean;
  message: string;
  errorCode?: string;
  data: T;
};

export type ResponseListModel<T> = Omit<ResponseModel<T>, 'data'> & {
  data: {
    data: T[];
    length: number;
  };
};

export type BaseResponseType<T> = AxiosResponse<ResponseModel<T>>;

export type BaseResponseListType<T> = AxiosResponse<ResponseListModel<T>>;

export type BaseResponseErrorType<T> = AxiosError<ResponseModel<T>>;

export interface ResponseResult extends AxiosResponse {
  result: boolean;
  message: string;
  errorCode?: string;
  data: any;
}
