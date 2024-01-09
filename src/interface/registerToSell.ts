import { EventTypeLabel, TicketStatusLabel } from '@constants/codeConstants';

export type RegisterToSellType = {
  id: number;
  sellerId: number;
  eventName: string;
  performer: string;
  performanceDate: string;
  registerTime: string;
  price: number;
  commissionFee: number;
  platformFee: number;
  status: keyof typeof TicketStatusLabel;
  proofOfOwner: string;
};

export interface TicketInformation {
  class: string;
  section: string;
  floor: string;
  row: string;
  moreInformation: string[];
  quantity: number;
  proofOfOwner: any;
  status: string;
}

export type RegisterInformation = {
  id: number;
  registerTime: string;
  deliveryMethod: string[];
  instantSalePrice: number;
  orderStatus: keyof typeof TicketStatusLabel;
};

export type SellerInformation = {
  userID: number;
  name: string;
  phoneNumber: string;
  email: string;
  defaultAddress: string;
};

export type EventInformation = {
  eventId: number;
  eventName: string;
  eventCategory: keyof typeof EventTypeLabel;
  performanceTime: string;
  place: string;
};

export type RegisterToSellDetailType = {
  ticketInformation: TicketInformation;
  registerInformation: RegisterInformation;
  sellerInformation: SellerInformation;
  eventInformation: EventInformation;
};
