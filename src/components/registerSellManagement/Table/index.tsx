import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import { TicketStatusLabel } from '@constants/codeConstants';

import ViewAttachment from '@components/common/ViewAttachment';
import { ROUTES } from '@constants/routes';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import { ColumnsType } from 'antd/es/table';
import { Eye } from 'iconsax-react';
import { PaginateType } from 'interface/general';
import { RegisterToSellType } from 'interface/registerToSell';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const Status = ({ type, label }: { type: string; label: string | null }) => {
  return (
    <S.Status type={type}>
      <div className="dot" />
      <div className="label">{label}</div>
    </S.Status>
  );
};

type Props = {
  resources: RegisterToSellType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const RegisterSellManagerTable = (props: Props) => {
  const navigate = useNavigate();
  const { resources, paginate, onChangePaginate, loading } = props;

  const columns: ColumnsType<RegisterToSellType> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Seller ID',
      dataIndex: 'sellerId',
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
      title: 'Performer',
      dataIndex: 'performer',
    },
    {
      title: 'Performance time',
      dataIndex: 'performanceDate',
      align: 'center',

      render: (_: string) => {
        return <div style={{ width: 120 }}>{dateTimeFormat(_)}</div>;
      },
    },
    {
      title: 'Register time',
      dataIndex: 'registerTime',
      render: (_: string) => {
        return <div style={{ width: 100 }}>{dateTimeFormat(_)}</div>;
      },
    },
    {
      title: 'Instant Sale price',
      dataIndex: 'instantSalePrice',
      render: (_: number) => {
        return <div style={{ width: 80 }}>{currencyFormat(_)}</div>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      render: (_: number) => {
        return (
          <div style={{ width: 80, textAlign: 'right', padding: 0 }}>
            {currencyFormat(_ || 0)}
          </div>
        );
      },
    },
    {
      title: 'Proof of owner',
      align: 'center',
      width: 120,
      dataIndex: 'proofOfOwner',
      render: (value: string) => {
        return value?.length ? (
          <ViewAttachment
            attachments={Array.isArray(value) ? [value] : [value]}
          />
        ) : null;
      },
    },
    {
      title: 'Commission fee (Seller)',
      dataIndex: 'commissionFee',
      render: (value: number) => {
        return <div style={{ width: 100 }}>{currencyFormat(value || 0)}</div>;
      },
    },
    {
      title: 'Platform fee (Buyer)',
      dataIndex: 'platformFee',
      render: (value: number) => {
        return <div style={{ width: 100 }}>{currencyFormat(value || 0)}</div>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (_: keyof typeof TicketStatusLabel) => {
        const status = Object.keys(TicketStatusLabel).includes(_)
          ? TicketStatusLabel[_]
          : null;

        return <Status type={_} label={status} />;
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record: RegisterToSellType, index: number) => (
        <S.Action>
          <Eye
            size={16}
            onClick={() =>
              navigate(`${ROUTES.REGISTER_SELL_MANAGEMENT}/${record.id}`)
            }
          />
          {record.status === 'PENDING' && (
            <>
              |{' '}
              <span
                aria-hidden
                className="approve"
                onClick={() =>
                  navigate(`${ROUTES.REGISTER_SELL_MANAGEMENT}/${record.id}`)
                }
              >
                Approve
              </span>
            </>
          )}
        </S.Action>
      ),
    },
  ];

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={resources}
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

export default RegisterSellManagerTable;
