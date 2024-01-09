import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { ListEventType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import { EventDetail, FilterEvent, NavigationData } from 'interface/navigation';
import { UserType } from 'interface/user';

const navigationService = {
  get: async () => {
    return axiosInstance().get<never, ResponseModel<NavigationData[]>>(
      ROUTE_API.GET_NAVIGATION
    );
  },
  getDetail: async (id: string) => {
    return axiosInstance().get<never, ResponseModel<any>>(
      `${ROUTE_API.NAVIGATION_DETAIL(id)}`
    );
  },
  getListEventDetail: async (params: FilterEvent) => {
    return axiosInstance().get<never, ResponseListModel<EventDetail>>(
      `${ROUTE_API.GET_LIST_EVENT_NAVIGATION_DETAIL}`,
      { params }
    );
  },
  update: async (params: any) => {
    return axiosInstance().put<never, ResponseModel<any>>(
      `${ROUTE_API.UPDATE_NAVIGATION}`,
      params
    );
  },
};

export default navigationService;
