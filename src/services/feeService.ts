import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { FormValueClearance } from '@pages/ClearanceFeeSetUp';
import { AxiosPromise } from 'axios';
import { ClearanceCurrentFee, ShippingCurrentFee } from 'interface/fee';

const feeService = {
  getCurrentShippingFee: async (): AxiosPromise<ShippingCurrentFee> => {
    return axiosInstance().get<ShippingCurrentFee>(ROUTE_API.SHIPPING_FEE);
  },

  createCurrentShippingFee: async (params: {
    currentFee: number | undefined;
  }): AxiosPromise<ShippingCurrentFee> => {
    return axiosInstance().post<ShippingCurrentFee>(
      ROUTE_API.SHIPPING_FEE,
      params
    );
  },
  getCurrentClearanceFee: async (): AxiosPromise<ClearanceCurrentFee> => {
    return axiosInstance().get<ClearanceCurrentFee>(ROUTE_API.CLEARANCE_FEE);
  },

  createCurrentClearanceFee: async (
    params: FormValueClearance
  ): AxiosPromise<ClearanceCurrentFee> => {
    const requestParams = {
      platformFee: Number(params.platformFee),
      commissionFee: Number(params.commissionFee),
    };
    return axiosInstance().post<ClearanceCurrentFee>(
      ROUTE_API.CLEARANCE_FEE,
      requestParams
    );
  },
};

export default feeService;
