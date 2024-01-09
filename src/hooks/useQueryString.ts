import { ObjectLiteral } from 'interface/general';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const useQueryString = () => {
  const location = useLocation();

  const paramsURL: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });

  return paramsURL;
};

export default useQueryString;
