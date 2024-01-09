import { LOCAL_STORE } from '../constants/codeConstants';

export const RESELL = 'resell';
export const USER = 'user';

export const localHandler = {
  getLocal: (key: string) => {
    return localStorage.getItem(key);
  },
  setLocal: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getSession: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setSession: (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  resetStorage: () => {
    localStorage.clear();
    sessionStorage.clear();
  },
  deleteKey: (name: string) => {
    return localStorage.getItem(name)
      ? localStorage.removeItem(name)
      : sessionStorage.removeItem(name);
  },
};

export const getLanguage = (): string => {
  const langList = ['en', 'kr'];
  let lang: string | null = localHandler.getLocal(LOCAL_STORE.LANG);
  if (!langList.includes(String(lang))) {
    lang = LOCAL_STORE.LANG_DEFAULT;
  }

  return String(lang);
};

/** get value local storage */
export const getLocalStorage = (name: string) => {
  const res =
    (localHandler.getLocal(name) && localHandler.getLocal(name)) ||
    (localHandler.getSession(name) && localHandler.getSession(name));
  if (res) {
    return JSON.parse(res);
  }

  return res;
};

type SaveLocalStorageType = {
  data: string;
  name: string;
  type: 'session' | 'storage';
};
export const saveLocalStorage = ({
  data,
  name,
  type = 'storage',
}: SaveLocalStorageType) => {
  if (type === 'storage') {
    localHandler.setLocal(name, data);
  } else {
    localHandler.setSession(name, data);
  }
};
