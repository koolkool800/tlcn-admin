import dayjs from 'dayjs';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

const useAddParams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  /**
   *   handle urlParams then navigate to url
   * @param object
   */
  const addParamsUrl = (object: {
    [key: string]: string | number | undefined | Date;
  }) => {
    for (const [key, value] of Object.entries(object)) {
      if (value !== undefined && value !== null && value !== '') {
        /** * Case value = Date Time */
        if (value instanceof dayjs) {
          const transformValue = dayjs(
            value as string | number | Date | dayjs.Dayjs | null | undefined
          ).format('YYYY-MM-DD');
          queryParams[key] = transformValue;
        } else {
          queryParams[key] = String(value);
        }
      } else {
        delete queryParams[key];
      }
    }
    const newQueryString = queryString.stringify(queryParams);
    navigate({
      pathname: location.pathname,
      search: newQueryString,
    });
  };

  /**
   *
   * @param paramName
   * @returns
   */
  const getParamUrl = <T>(): T => {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = String(value);
      } else {
        delete queryParams[key];
      }
    }
    return queryParams as T;
  };

  return { addParamsUrl, getParamUrl };
};

export default useAddParams;
