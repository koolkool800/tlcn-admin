export type FaqType = {
  faqId: string;
  categoryName: string;
  categoryId: string;
  engQuestion: string;
  korQuestion: string;
  engAnswer: string;
  korAnswer: string;
};

export type FaqsResponseType = {
  faqId: string;
  faqQuestion: string;
  faqAnswer: string;
  faqCreatedTime: string;
  faqCategoryName: string;
  faqStatus: keyof typeof FaqStatus;
};

export type FaqCategory = {
  categoryId: string;
  categoryName: string;
};

export type FaqCreateType = Omit<FaqType, 'faqId' | 'categoryName'>;

export enum FaqStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type FaqUpdateModel = {
  id: string;
  status?: keyof typeof FaqStatus;
  categoryId?: string;
  engAnswer?: string;
  engQuestion?: string;
  korAnswer?: string;
  korQuestion?: string;
};
