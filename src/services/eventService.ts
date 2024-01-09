import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import {
  ListEventType,
  CreateEventRequestBody,
  EventType,
  TradingVolume,
} from 'interface/event';
import { ObjectLiteral } from 'interface/general';

const eventService = {
  get: async (params: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModel<ListEventType>>(
      ROUTE_API.EVENT,
      {
        params,
      }
    );
  },

  getFilter: async () => {
    return axiosInstance().get<
      never,
      ResponseModel<{ field: string; data: string[] }[]>
    >(ROUTE_API.EVENT_FILTER);
  },
  getDetail: (id: any, filter: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseModel<EventType>>(
      ROUTE_API.EVENT_DETAIL.replace(':id', id)
    );
  },
  getTradingVolume: (id: any) => {
    return axiosInstance().get<never, ResponseModel<TradingVolume>>(
      ROUTE_API.TRADING_VOLUME.replace(':id', id)
    );
  },
  post: async (body: CreateEventRequestBody) => {
    return axiosInstance().post(ROUTE_API.EVENT, body);
  },
  put: async (id: any, body: CreateEventRequestBody) => {
    return axiosInstance().put(ROUTE_API.UPDATE_EVENT.replace(':id', id), body);
  },
};

export default eventService;
