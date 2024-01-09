import { RcFile } from 'antd/es/upload';

/**
 * Get src from file
 * @param img file
 * @param callback handle file to url
 */
export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
