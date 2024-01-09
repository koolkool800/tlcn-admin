import { CategoryBanner } from '@constants/codeConstants';

export type BannerCategoryPositionResultResponse = {
  primary: string[];
  sub: string[];
};
export type CreateNewBannerModel = {
  banner?: string;
  thumbnail?: string;
  position?: number;
  link?: string;
  category?: CategoryBanner;
  status?: keyof typeof BannerStatus;
  id?: string;
};
export type BannerResponseResult = {
  banner: string;
  thumbnail: string;
  category: CategoryBanner;
  createdAt: string;
  id: string;
  link: string;
  position: number;
  status: keyof typeof BannerStatus;
  updatedAt: string;
};

export type BannerUpdateListPosition = {
  id: string;
  position: string;
}[];

export enum BannerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
