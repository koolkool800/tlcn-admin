type Row = {
  name: string;
};

type Floor = {
  name: string;
  row: Row[];
};

type Section = {
  name: string;
  floor: Floor[];
};

type Group = {
  groupId: string;
  name: string;
  color: string;
  minPrice: number;
  isObstructed: boolean;
  originalPrice: number;
  section: Section[];
};

export type CreateEventRequestBody = {
  id?: string | number;
  title?: string;
  eventType?: string;
  performanceDate?: string;
  place?: string;
  stageMap?: string | null;
  performer?: string;
  coverImage?: string;
  platformFee?: number;
  comissionFee?: number;
  backgroundImage?: string;
  groups?: Group[];
  deliveryMethods: string;
};

export type EventType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  performer: string;
  eventStatus: string;
  performanceDate: string;
  place: string;
  coverImage: string;
  backgroundImage: string;
  eventType: string;
  pinOrder: number;
  view: number;
  ticketAvailable: number;
  platformFee: number;
  commissionFee: number;
  seatQuantity: number;
  stageMap: string;
  group: [];
  deliveryMethods: string[];
};

export type ListEventType = {
  eventId: number;
  eventName: string;
  eventType: string;
  eventPerformer: string;
  eventPerformanceTime: string;
  eventPlace: string;
  eventThumbnail: string;
  eventPlatformFee: number;
  eventCommissionFee: number;
  numberOfListingTicket: number;
  numberOfSoldTicket: number;
  numberOfCompletedTransaction: number;
  eventStatus: string;
};

export type TradingVolume = {
  groupName: string;
  numberOfTicketTotal: number;
  numberOfSoldTicket: number;
  numberOfSoldTicketRate: number;
  numberOfUnsoldTicket: number;
  numberOfUnsoldTicketRate: number;
};
