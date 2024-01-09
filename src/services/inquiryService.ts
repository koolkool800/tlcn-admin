import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { InquiryType } from 'interface/inquiry';

const inquiryService = {
  get: async (params: ObjectLiteral) => {
    return axiosInstance().get<never, ResponseListModel<InquiryType>>(
      ROUTE_API.INQUIRY,
      {
        params,
      }
    );
  },

  getDetail: async (id: number) => {
    return axiosInstance().get<never, ResponseModel<InquiryType>>(
      `${ROUTE_API.INQUIRY_DETAIL}/${id}`
    );
  },

  reply: async (id: number, answer: string) => {
    return axiosInstance().put<never>(
      `${ROUTE_API.INQUIRY_DETAIL}/${id}/reply`,
      {
        answer,
      }
    );
  },
};

export default inquiryService;
