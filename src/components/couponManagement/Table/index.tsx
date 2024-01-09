import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import {
  VoucherCategoryLabel,
  VoucherConditionLabel,
  VoucherTypeLabel,
} from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { currencyFormat } from '@utils/format';
import { message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Copy, Eye } from 'iconsax-react';
import { Condition, CouponResponseType } from 'interface/coupon';
import { PaginateType } from 'interface/general';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  resources: CouponResponseType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const CouponManagementTable = ({
  resources,
  paginate,
  onChangePaginate,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: 'Coupon name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: CouponResponseType) => {
        return <div style={{ width: 120 }}>{_}</div>;
      },
    },
    {
      title: 'Object',
      dataIndex: 'applyForSeller',
      render: (value: boolean) => {
        return value ? 'Seller' : 'Buyer';
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      render: (value: string) => {
        return (
          <S.Code
            onClick={() => {
              navigator.clipboard.writeText(value);
              message.success('Copy test successful');
            }}
          >
            {value} <Copy />
          </S.Code>
        );
      },
    },
    {
      title: 'Coupon description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record: CouponResponseType) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Remain Quantity',
      dataIndex: 'remainQuantity',
      key: 'remainQuantity',
      render: (value: string) => {
        return <div style={{ width: 120 }}>{value}</div>;
      },
    },
    {
      title: 'Category coupon',
      dataIndex: 'voucherCategory',
      key: 'voucherCategory',
      render: (value: keyof typeof VoucherCategoryLabel) => {
        return <div style={{ width: 140 }}>{VoucherCategoryLabel[value]}</div>;
      },
    },
    {
      title: 'Discount value',
      dataIndex: 'discount',
      key: 'discount',
      render: (_, record: CouponResponseType) => {
        if (
          record?.type.toLocaleLowerCase() ===
          VoucherTypeLabel.PERCENT.toLocaleLowerCase()
        ) {
          return `${record?.discount}%`;
        }
        return (
          <div style={{ width: 100 }}>
            {currencyFormat(record?.discount || 0)}
          </div>
        );
      },
    },
    {
      title: 'Unit',
      dataIndex: 'type',
      key: 'unit',
      render: (value: keyof typeof VoucherTypeLabel) => {
        return VoucherTypeLabel[value];
      },
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (_, record: CouponResponseType) => {
        return dayjs(record.startDate).format('YYYY/MM/DD');
      },
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (_, record: CouponResponseType) => {
        return dayjs(record.expiredDate).format('YYYY/MM/DD');
      },
    },
    {
      title: 'Applied condition',
      dataIndex: 'condition',
      render: (_, record: CouponResponseType) => {
        return (
          <div>
            {record?.conditions?.map((condition: Condition, i: number) => (
              <div
                key={`${condition.value}_${String(i)}`}
                style={{ width: 200 }}
              >
                {[
                  VoucherConditionLabel[condition.name],
                  condition.operator,
                  condition.value,
                ].join(' ')}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record: CouponResponseType, index: number) => (
        <S.WrapperAction>
          <span
            aria-hidden
            className="action"
            onClick={() =>
              navigate(ROUTES.COUPON_MANAGEMENT_UPDATE(String(record.id)))
            }
          >
            Edit
          </span>
          |
          <Eye
            size={16}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              navigate(`${ROUTES.COUPON_MANAGEMENT}/${record?.id}/view`)
            }
          />
        </S.WrapperAction>
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

export default CouponManagementTable;
