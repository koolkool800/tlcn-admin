import { EventTypeLabel, TicketStatusLabel } from '@constants/codeConstants';

export type RegisterSellerType = {
  requestId: number;
  requestRegisterTime: string;
  certificateLink: string;
  bankbookLink: string;
  requestStatus: string;
  userId: number;
};
