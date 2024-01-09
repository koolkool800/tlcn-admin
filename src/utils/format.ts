import dayjs from 'dayjs';
import { ObjectLiteral } from 'interface/general';
import queryString from 'query-string';
import { Location, NavigateFunction } from 'react-router-dom';
import { getLanguage } from './localStorage';

export const currencyFormat = (
  num: number,
  options: { [key: string]: any } = { maximumSignificantDigits: 5 }
): string | null => {
  const current = getLanguage();
  try {
    return `${new Intl.NumberFormat(current, options).format(num)} $`;
  } catch (err) {
    return null;
  }
};

export const phoneFormat = (phone: string | number | null | undefined) => {
  return phone;
};

export const dateTimeFormat = (date: string | null | undefined) => {
  if (!date) return null;
  return dayjs(date).format('DD.MM.YYYY');
};
export const dateTimeFormatWithHour = (date: string | null | undefined) => {
  if (!date) return null;
  const formattedDate = dayjs(date).format('DD.MM.YYYY (ddd) h:mm A');
  return formattedDate;
};

export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getTomorrow = () => {
  const currentDay = new Date();
  const tomorrow = new Date(currentDay);
  tomorrow.setDate(currentDay.getDate() + 1);
  return dayjs(tomorrow).format('DD.MM.YYYY');
};

const colors = [
  '#FFB900',
  '#D83B01',
  '#B50E0E',
  '#E81123',
  '#B4009E',
  '#5C2D91',
  '#0078D7',
  '#00B4FF',
  '#008272',
  '#107C10',
];

export const avatarGenerator = (name: string): string => {
  const index = (name?.charCodeAt(0) || 0) % colors.length;
  return colors[index];
};

export const pushParams = (
  navigate: NavigateFunction,
  location: Location,
  paramsValue: ObjectLiteral = {},
  pathname = ''
) => {
  const paramsUrl: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });

  const formatParamsValue: ObjectLiteral = {};

  Object.entries(paramsValue).forEach(([key, value]) => {
    /** * Case value = Date Time */
    if (value instanceof dayjs) {
      formatParamsValue[key] = dayjs(
        value as string | number | Date | dayjs.Dayjs | null | undefined
      ).format('YYYY-MM-DD');
    } else {
      formatParamsValue[key] = value;
    }
  });

  navigate({
    pathname,
    search: queryString.stringify({
      ...paramsUrl,
      ...formatParamsValue,
    }),
  });
};

export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!urlPattern.test(urlString);
};

export const checkEventDate = (eventDate?: any) => {
  const performanceTime = dayjs(eventDate);
  const now = dayjs();
  return performanceTime.diff(now, 'day') < 5;
};
