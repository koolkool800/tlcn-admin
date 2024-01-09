import { CategoryBanner } from '@constants/codeConstants';
import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import {
  BannerCategoryPositionResultResponse,
  BannerResponseResult,
  BannerUpdateListPosition,
  CreateNewBannerModel,
} from 'interface/banner';
import { BaseFilterType } from 'interface/general';

const bannerService = {
  createNewBanner: async ({
    banner,
    category,
    link,
    position,
    thumbnail,
  }: CreateNewBannerModel) => {
    return axiosInstance().post<never, ResponseModel<BannerResponseResult>>(
      ROUTE_API.BANNER,
      {
        banner,
        category,
        link,
        thumbnail,
        position,
      }
    );
  },
  updateBanner: async ({
    banner,
    category,
    link,
    position,
    status,
    id,
    thumbnail,
  }: CreateNewBannerModel) => {
    return axiosInstance().patch<never, ResponseModel<any>>(
      `${ROUTE_API.BANNER}/${id}`,
      {
        banner,
        category,
        link,
        position,
        status,
        thumbnail,
      }
    );
  },
  deleteBanner: async ({ id }: CreateNewBannerModel) => {
    return axiosInstance().delete<never, ResponseModel<any>>(
      `${ROUTE_API.BANNER}/${id}`
    );
  },
  getBanners: async (
    params: Omit<
      BaseFilterType & {
        category: keyof typeof CategoryBanner;
      },
      'sortBy' | 'length' | 'page'
    >
  ) => {
    return axiosInstance().get<never, ResponseListModel<BannerResponseResult>>(
      ROUTE_API.BANNER,
      {
        params: {
          category: params.category,
          limit: params?.limit,
          offset: params?.offset,
        },
      }
    );
  },
  getBannersPositionAvailable: async () => {
    return axiosInstance().get<
      never,
      ResponseModel<BannerCategoryPositionResultResponse>
    >(`${ROUTE_API.BANNER}/position-available`);
  },
  getDetailBanner: async (id: string) => {
    return axiosInstance().get<never, ResponseModel<BannerResponseResult>>(
      `${ROUTE_API.BANNER_DETAIL}/${id}`
    );
  },
  updatePositionListBanner: async (body: BannerUpdateListPosition) => {
    return axiosInstance().patch<never, ResponseModel<null>>(
      ROUTE_API.BANNER_UPDATE_LIST,
      { body }
    );
  },
};

export default bannerService;
