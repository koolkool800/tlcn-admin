import queryString from 'query-string';

export const addParamsUrl = (
  object: {
    [key: string]: string | number | undefined | Date;
  },
  navigate: any
) => {
  const queryParams = queryString.parse(window.location.search);
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined && value !== null && value !== '') {
      queryParams[key] = String(value);
    } else {
      delete queryParams[key];
    }
  }
  const newQueryString = queryString.stringify(queryParams);

  navigate({
    pathname: window.location.pathname,
    search: newQueryString,
  });
};

export const getParamUrl = (paramName: string): string | undefined => {
  const queryParams = queryString.parse(window.location.search);
  const paramValue = queryParams[paramName];

  if (typeof paramValue === 'string' || paramValue === undefined) {
    return paramValue;
  }

  return undefined;
};
