export type NavigationData = {
  id: number;
  name: string;
  iconUrl: string;
  inTopBar: true;
};
export type EventDetail = {
  id: number;
  eventName: string;
  performer: string;
  status: string;
  performanceTime: string;
  place: string;
  thumbnail: string;
  eventType: string;
  belongNavCateId: boolean;
};
export type FilterEvent = {
  keyword?: string;
  limit?: number;
  offset?: number;
  navCateId?: number;
  eventType?: string;
};
