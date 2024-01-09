import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseModel } from 'interface';
import { TopHighestRevenue } from 'interface/dashboard';
import { ObjectLiteral } from 'interface/general';

const dashboardService = {
  getRequestPending: () => {
    return axiosInstance().get<never, ResponseModel<ObjectLiteral>>(
      ROUTE_API.REQUEST_PENDING
    );
  },

  getHighestRevenue: () => {
    return axiosInstance().get<never, ResponseModel<TopHighestRevenue[]>>(
      ROUTE_API.GET_HIGHEST_REVENUE
    );
  },

  getRevenueDashboard: (filterParams: string) => {
    return axiosInstance().get<
      never,
      ResponseModel<{ revenue: number; day: string }[]>
    >(`${ROUTE_API.GET_REVENUE_DASHBOARD}?${filterParams}`);
  },
};

export default dashboardService;
