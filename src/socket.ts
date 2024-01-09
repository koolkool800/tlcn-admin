/* eslint-disable import/no-extraneous-dependencies */
import { io } from 'socket.io-client';
import { CONFIG } from '@constants/codeConstants';

export const socket = io(CONFIG.API_URL, {
  extraHeaders: {
    authorization: `Bearer ${
      localStorage.getItem('token') ?? sessionStorage.getItem('token')
    }`,
  },
});
