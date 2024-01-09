import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import {
  FaqCategory,
  FaqCreateType,
  FaqsResponseType,
  FaqType,
  FaqUpdateModel,
  ResponseListModel,
  ResponseModel,
  ResponseResult,
} from 'interface';
import { ObjectLiteral, PaginateType } from 'interface/general';

const faqService = {
  getFAQs: async ({
    limit,
    offset,
    sortBy,
    q,
  }: Omit<PaginateType & ObjectLiteral, 'length'>) => {
    return axiosInstance().get<never, ResponseListModel<FaqsResponseType>>(
      ROUTE_API.FAQ,
      { params: { limit, offset, sortBy, q } }
    );
  },
  createFaq: async ({
    categoryId,
    engAnswer,
    engQuestion,
    korAnswer,
    korQuestion,
  }: FaqCreateType) => {
    return axiosInstance().post<never, ResponseResult>(ROUTE_API.FAQ, {
      categoryId,
      engAnswer,
      engQuestion,
      korAnswer,
      korQuestion,
    });
  },
  updateFaq: async ({
    categoryId,
    engAnswer,
    engQuestion,
    korAnswer,
    korQuestion,
    id,
    status,
  }: FaqUpdateModel) => {
    return axiosInstance().patch<never, ResponseResult>(
      `${ROUTE_API.FAQ}/${id}`,
      {
        status,
        categoryId,
        engAnswer,
        engQuestion,
        korAnswer,
        korQuestion,
      }
    );
  },
  deleteFaq: async (id: string) => {
    return axiosInstance().delete<never, ResponseResult>(
      `${ROUTE_API.FAQ}/${id}`
    );
  },
  getDetailFAQ: async (id: string) => {
    return axiosInstance().get<never, ResponseModel<FaqType>>(
      `${ROUTE_API.FAQ}/${id}`
    );
  },
  getFaqCategories: async () => {
    return axiosInstance().get<
      never,
      ResponseModel<FaqCategory[] & { length: number }>
    >(ROUTE_API.FAQ_CATEGORIES);
  },
};

export default faqService;
