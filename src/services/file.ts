import { CategoryBanner } from '@constants/codeConstants';
import { ROUTE_API } from '@constants/routes';
import { axiosInstance } from '@lib/axios';
import { ResponseListModel, ResponseModel } from 'interface';
import { UploadBannerResponseResult } from 'interface/file';

const fileServices = {
  uploadNewBannerImg: async (formData: FormData) => {
    return axiosInstance().postForm<never, UploadBannerResponseResult>(
      ROUTE_API.FILE_BANNER,
      formData
    );
  },
};

export default fileServices;
