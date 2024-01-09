import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  RESELL,
  USER,
  getLocalStorage,
  localHandler,
  saveLocalStorage,
} from '@utils/localStorage';

import { Auth, UserType } from 'interface';

const authInit: Auth = {
  name: undefined,
  email: undefined,
  accessToken: getLocalStorage(RESELL),
  state: '',
  user: null,
};
const authReducer = createSlice({
  name: 'authReducer',
  initialState: authInit,
  reducers: {
    resetState: () => {
      localHandler.deleteKey(RESELL);
      return { ...authInit };
    },
    infoUserBySNS: (state, action: PayloadAction<Auth>) => {
      return { ...state, ...action.payload };
    },
    login: (state, action: PayloadAction<any>) => {
      const { remember, accessToken, user } = action.payload;
      // save token to local storage
      saveLocalStorage({
        data: accessToken,
        name: RESELL,
        type: remember ? 'storage' : 'session',
      });

      saveLocalStorage({
        data: user,
        name: USER,
        type: remember ? 'storage' : 'session',
      });

      return { ...state, accessToken };
    },
    loginSNS: (state, action: PayloadAction<{ accessToken: string }>) => {
      // save token to local storage
      saveLocalStorage({
        data: action.payload.accessToken,
        name: RESELL,
        type: 'storage',
      });
      return { ...state, ...action.payload };
    },
  },
});
export const { resetState, infoUserBySNS, login, loginSNS } =
  authReducer.actions;
export default authReducer.reducer;
