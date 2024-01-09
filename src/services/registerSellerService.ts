import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { RegisterSellerType } from 'interface/registerSeller';

const registerSellerService = {
  get: async (params: ObjectLiteral = {}, headers: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModel<RegisterSellerType>>(
      ROUTE_API.GET_REGISTER_SELLER,
      {
        params,
        headers,
      }
    );
  },
  update: async (params: {
    requestId: string;
    status: string;
    rejectedReason?: string;
  }) => {
    return axiosInstance().patch(
      `${ROUTE_API.UPDATE_REGISTER_SELLER(params.requestId)}`,
      {
        status: params.status,
        rejectedReason: params.rejectedReason,
      }
    );
  },
};

export default registerSellerService;
