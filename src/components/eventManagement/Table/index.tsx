import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import ViewAttachment from '@components/common/ViewAttachment';
import { EventStatusLabel, EventTypeLabel } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { ActionView } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/format';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { ListEventType } from 'interface/event';
import { PaginateType } from 'interface/general';
import * as S from './style';

const columns: ColumnsType<any> = [
  {
    title: 'Event ID',
    dataIndex: 'eventId',
    render: (_: string) => {
      return <div style={{ width: 80 }}>{_}</div>;
    },
  },
  {
    title: 'Event name',
    dataIndex: 'eventName',
    render: (_: string) => {
      return <div style={{ width: 160 }}>{_}</div>;
    },
  },
  {
    title: 'Event type',
    dataIndex: 'eventType',
    render: (_: keyof typeof EventTypeLabel) => {
      return <div style={{ width: 120 }}>{EventTypeLabel[_]}</div>;
    },
  },
  {
    title: 'Performer',
    dataIndex: 'eventPerformer',
    render: (_: string) => {
      return <div style={{ width: 120 }}>{_}</div>;
    },
  },
  {
    title: 'Performance time',
    dataIndex: 'eventPerformanceTime',
    render: (_: string) => {
      return (
        <>
          <div style={{ width: 180 }}>
            {dayjs(_).format('YYYY.MM.DD (ddd)')}
          </div>
          <div style={{ width: 180 }}>{dayjs(_).format('h:mm A')}</div>
        </>
      );
    },
  },
  {
    title: 'Place',
    dataIndex: 'eventPlace',
    render: (_: string) => {
      return <div style={{ width: 120 }}>{_}</div>;
    },
  },
  {
    title: 'Thumbnail',
    dataIndex: 'eventThumbnail',
    render: (_: string) => {
      return (
        <div style={{ width: 50 }}>
          <ViewAttachment attachments={[_]} />
        </div>
      );
    },
  },
  {
    title: 'Platform fee',
    dataIndex: 'eventPlatformFee',
    render: (value: number) => {
      return <div style={{ width: 80 }}>{`${value || 0}%`}</div>;
    },
  },
  {
    title: 'Commission fee',
    dataIndex: 'eventCommissionFee',
    render: (value: number) => {
      return <div style={{ width: 80 }}>{currencyFormat(value || 0)}</div>;
    },
  },
  {
    title: 'Listing Ticket',
    dataIndex: 'numberOfListingTicket',
  },
  {
    title: 'Sold Ticket',
    dataIndex: 'numberOfSoldTicket',
  },
  {
    title: 'Completed Transaction',
    dataIndex: 'numberOfCompletedTransaction',
  },
  {
    title: 'Status',
    dataIndex: 'eventStatus',
    render: (_: keyof typeof EventStatusLabel) => {
      return (
        <S.Status type={_}>
          <div className="dot" />
          <div>{EventStatusLabel[_]}</div>
        </S.Status>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'eventId',
    render: (eventId: string) => {
      return (
        <ActionView
          to={`${ROUTES.DETAIL_MANAGEMENT.replace(
            ':id',
            JSON.stringify(eventId)
          )}`}
        >
          <Eye size={20} />
        </ActionView>
      );
    },
  },
];

type Props = {
  resources: ListEventType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const EventManagementTable = ({
  resources,
  paginate,
  onChangePaginate,
  loading,
}: Props) => {
  return (
    <>
      <DataTable
        rowKey="eventId"
        loading={loading}
        columns={columns}
        data={resources}
        footer={() => {
          return (
            <Pagination
              onChangePage={onChangePaginate}
              paginationTable={{
                page: paginate.page,
                limit: paginate.limit,
                length: paginate.length,
              }}
            />
          );
        }}
      />
    </>
  );
};

export default EventManagementTable;
