import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';

import { ObjectLiteral } from 'interface/general';
import { FilterOrderResponseType, OrderResponseType } from 'interface/order';

const orderService = {
  get: async (filter: ObjectLiteral) => {
    return axiosInstance().get<never, ResponseListModel<OrderResponseType>>(
      ROUTE_API.ORDER,
      { params: filter }
    );
  },
  getFilter: async () => {
    return axiosInstance().get<never, ResponseModel<FilterOrderResponseType>>(
      ROUTE_API.ORDER_FILTER
    );
  },

  getDetail: (id: string) => {
    return axiosInstance().get<never, ResponseModel<OrderResponseType>>(
      `${ROUTE_API.ORDER_DETAIL(id)}`
    );
  },

  received: (id: string, body: ObjectLiteral) => {
    return axiosInstance().put(ROUTE_API.ORDER_DETAIL(id), body);
  },
};

export default orderService;
