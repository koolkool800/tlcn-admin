import { CONFIG } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { store } from '@redux/store';
import { RESELL, localHandler } from '@utils/localStorage';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = () => {
  const Axios: AxiosInstance = axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const { accessToken } = store.getState().authReducer;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response?.data;
    },
    (error: AxiosError<any>) => {
      if (error.response && error.response.data) {
        if (error.response.status === 401 || error.response.status === 403) {
          localHandler.deleteKey(RESELL);
          window.location.replace(
            `${ROUTES.LOGIN}?flashMessage=${error.response?.data?.errorCode}`
          );
        }
        return Promise.reject(error.response?.data);
      }

      return Promise.reject(error.response?.data);
    }
  );

  return Axios;
};

export { axiosInstance };
