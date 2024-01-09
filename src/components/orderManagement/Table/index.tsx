import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import { OrderStatusLabel } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { ActionView } from '@style/DefaultStyled';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { EventType } from 'interface/event';
import { PaginateType } from 'interface/general';
import {
  OrderBaseCategoryType,
  OrderResponseType,
  OrderTicketCategoryType,
} from 'interface/order';

const columns: ColumnsType<any> = [
  {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
    render: (_: string) => {
      return <div style={{ width: 80 }}>{_}</div>;
    },
  },
  {
    title: 'Event name',
    dataIndex: 'event',
    key: 'event.title',
    render: (_: EventType) => {
      return <div style={{ width: 160 }}>{_?.title}</div>;
    },
  },
  {
    title: 'Performer',
    dataIndex: 'event',
    key: 'event.performer',
    render: (_: EventType) => {
      return <div style={{ width: 120 }}>{_?.performer}</div>;
    },
  },
  {
    title: 'Performance Time',
    dataIndex: 'event',
    key: 'event.performerTime',
    render: (_: EventType) => {
      return _?.performanceDate ? (
        <div style={{ width: 120 }}>
          <div>{dayjs(_?.performanceDate).format('YYYY.MM.DD (ddd)')}</div>
          <div>{dayjs(_?.performanceDate).format('hh:mm A')}</div>
        </div>
      ) : null;
    },
  },
  {
    title: 'Order time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (_: string) => {
      return (
        <div style={{ width: 100 }}>
          <div>{dayjs(_).format('YYYY.MM.DD')}</div>
          <div>{dayjs(_).format('HH:mm:ss')}</div>
        </div>
      );
    },
  },
  {
    title: 'Ticket Quantity',
    dataIndex: 'ticket',
    align: 'center',
    render: (_: OrderTicketCategoryType) => {
      return <div style={{ width: 100 }}>{_?.seatQuantity}</div>;
    },
  },
  {
    title: 'Ticket Price',
    dataIndex: 'totalPrice',
    align: 'right',
    render: (_: number) => {
      return (
        <div style={{ width: 100, textAlign: 'right' }}>
          {currencyFormat(_)}
        </div>
      );
    },
  },
  {
    title: 'Platform fee (Buyer pay)',
    dataIndex: 'platformFee',
    align: 'right',
    render: (_: number) => {
      return (
        <div style={{ width: 120, textAlign: 'right' }}>
          {currencyFormat(_ || 0)}
        </div>
      );
    },
  },
  {
    title: 'Commission fee (Seller pay)',
    dataIndex: 'commissionFee',
    render: (_: number) => {
      return <div style={{ width: 100 }}>{currencyFormat(_ || 0)}</div>;
    },
  },
  {
    title: 'Delivery fee (Buyer pay)',
    dataIndex: 'deliveryFee',
    align: 'right',
    render: (_: number) => {
      return (
        <div style={{ width: 100, textAlign: 'right' }}>
          {currencyFormat(_)}
        </div>
      );
    },
  },
  {
    title: 'Seller ID',
    dataIndex: 'seller',
    render: (_: OrderBaseCategoryType) => {
      return <div style={{ width: 100 }}>{_?.id}</div>;
    },
  },
  {
    title: 'Buyer ID',
    dataIndex: 'buyer',
    render: (_: OrderBaseCategoryType) => {
      return <div style={{ width: 100 }}>{_?.id}</div>;
    },
  },
  // {
  //   title: 'Cash receipt category',
  //   dataIndex: 'cashReceiptType',
  //   render: (_: string) => {
  //     return <div style={{ width: 100 }}>{_ || '_'}</div>;
  //   },
  // },

  // {
  //   title: 'Cash receipt Information',
  //   dataIndex: 'cashReceipt',
  //   render: (_: string) => {
  //     return <div style={{ width: 100 }}>{_ || '_'}</div>;
  //   },
  // },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (_: keyof typeof OrderStatusLabel) => {
      return (
        <div style={{ maxWidth: 180 }}>
          <Status label={OrderStatusLabel[_]} type={_} />
        </div>
      );
    },
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (_: string) => {
      return (
        <ActionView to={`${ROUTES.ORDER_MANAGEMENT}/${_}`}>
          <Eye size={20} />
        </ActionView>
      );
    },
  },
];
type Props = {
  resources: OrderResponseType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const OrderManagementTable = ({
  resources,
  paginate,
  onChangePaginate,
  loading,
}: Props) => {
  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={resources}
        rowKey="id"
        scroll={{ x: 300 }}
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

export default OrderManagementTable;
