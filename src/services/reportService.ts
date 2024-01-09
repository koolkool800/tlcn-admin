import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { ReportType } from 'interface/report';

const reportService = {
  get: async (filter: ObjectLiteral) => {
    return axiosInstance().get<never, ResponseListModel<ReportType>>(
      ROUTE_API.REPORT_ORDER,
      {
        params: filter,
      }
    );
  },

  update: async (id: string, body: ObjectLiteral = {}) => {
    return axiosInstance().put(`${ROUTE_API.REPORT_ORDER}/${id}`, body);
  },
};

export default reportService;
