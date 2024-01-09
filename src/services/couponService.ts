import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { CouponResponseType, FormCouponType } from 'interface/coupon';
import { ObjectLiteral } from 'interface/general';

const couponService = {
  get: async (params: ObjectLiteral = {}) => {
    return axiosInstance().get<never, ResponseListModel<CouponResponseType>>(
      ROUTE_API.VOUCHER,
      {
        params,
      }
    );
  },

  post: async (body: FormCouponType) => {
    return axiosInstance().post(ROUTE_API.VOUCHER, body);
  },

  put: async (id: string, body: FormCouponType) => {
    return axiosInstance().put(`${ROUTE_API.VOUCHER}/${id}`, body);
  },

  getDetail: async (id: string | null) => {
    return axiosInstance().get<never, ResponseModel<CouponResponseType>>(
      `${ROUTE_API.VOUCHER_DETAIL}/${id}`
    );
  },
};

export default couponService;
