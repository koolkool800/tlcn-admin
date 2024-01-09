import DataTable from '@components/common/DataTable';
import Pagination from '@components/common/Pagination';
import {
  PaymentMethodLabel,
  TRANSACTION_METHOD,
  UserManagementTableType,
} from '@constants/codeConstants';
import userService from '@services/userService';
import { H6 } from '@style/DefaultStyled';
import { currencyFormat, dateTimeFormat } from '@utils/format';
import { ColumnsType } from 'antd/es/table';
import { PaginateType, initFilter } from 'interface/general';
import { PurchaseOrderType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';

type Props = {
  title: string;
  type: UserManagementTableType;
};

const PurchaseInformation = ({ title, type }: Props) => {
  const params = useParams();

  /** * State */
  const [resources, setResources] = useState<PurchaseOrderType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paginate, setPaginate] = useState<PaginateType>({ ...initFilter });
  const [loading, setLoading] = useState(false);
  /** * Fetch data */
  const fetchData = async () => {
    setLoading(true);
    try {
      let func = null;
      switch (type) {
        case UserManagementTableType.PURCHASE:
          func = userService.getPurchaseOrder;
          break;
        case UserManagementTableType.SOLD:
          func = userService.getSoldOrder;
          break;
        default:
          break;
      }

      if (func) {
        const res = await func(String(params?.id), paginate);
        setResources(res?.data?.data || []);
        setTotalPrice(res?.data?.totalOrdersPrice || 0);
        setPaginate({
          ...paginate,
          length: res?.data?.length || 0,
        });
      }
    } catch (err) {
      /* empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  const columns: ColumnsType<any> = [
    {
      title: 'Order number',
      dataIndex: 'id',
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (value: string, record: PurchaseOrderType) => {
        if (type === UserManagementTableType.PURCHASE) {
          return dateTimeFormat(record?.buyer?.createdAt);
        }
        return dateTimeFormat(record?.seller?.createdAt);
      },
    },
    {
      title: 'Product Information',
      dataIndex: '',
      width: 250,
      render: (value: string, record: PurchaseOrderType) => {
        return record?.event?.title;
      },
    },
    {
      title: 'Product Amount',
      dataIndex: '',
      render: (value: string, record: PurchaseOrderType) => {
        return 1;
      },
    },
    {
      title: 'Transaction method',
      dataIndex: 'deliveryMethod',
      render: (value: string, record: PurchaseOrderType) => {
        return TRANSACTION_METHOD[record.deliveryMethod];
      },
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      render: (
        value: keyof typeof PaymentMethodLabel,
        record: PurchaseOrderType
      ) => {
        return PaymentMethodLabel[value];
      },
    },
    {
      title: 'Order Value',
      dataIndex: 'totalPayment',
      render: (value: string, record: PurchaseOrderType) => {
        return currencyFormat(record?.totalPayment);
      },
    },
  ];

  return (
    <>
      <S.Header>
        <H6>{title}</H6>
        <S.Total>Total: {currencyFormat(totalPrice)}</S.Total>
      </S.Header>
      <DataTable
        columns={columns}
        hiddenPagination
        data={resources}
        loading={loading}
        footer={() => {
          return (
            <Pagination
              hasPushParams={false}
              onChangePage={() => {}}
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

export default PurchaseInformation;
