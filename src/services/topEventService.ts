import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import {
  AllTopEventsForSelectResponse,
  ListTopEventResponse,
  ResponseListModel,
  ResponseModel,
} from 'interface';
import { ObjectLiteral } from 'interface/general';

const topEventService = {
  getTopEvent: async () => {
    return axiosInstance().get<never, ResponseModel<ListTopEventResponse[]>>(
      ROUTE_API.TOP_EVENT
    );
  },
  configTopEvent: async (model: {
    data: { eventId: string; pinOrder: number }[];
  }) => {
    return axiosInstance().post<never, ResponseModel<null>>(
      ROUTE_API.CONFIG_TOP_EVENT,
      { data: model.data }
    );
  },
  getEventsForTopEvents: async (params: ObjectLiteral = {}) => {
    return axiosInstance().get<
      never,
      ResponseListModel<AllTopEventsForSelectResponse>
    >(ROUTE_API.GET_EVENTS_FOR_TOP_EVENTS, {
      params,
    });
  },
};

export default topEventService;
