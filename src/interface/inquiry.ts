import { InquiryStatusLabel } from '@constants/codeConstants';

export type InquiryType = {
  id: number;
  title: string;
  question: string;
  createdAt: string;
  userId: number;
  answer: string;
  replyTime: string | null;
  status: keyof typeof InquiryStatusLabel;
};
