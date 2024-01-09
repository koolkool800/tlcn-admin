import CustomLink from '@components/common/CustomLink';
import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
  PaginationTable,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import { STATUS, STATUS_COLOR, STATUS_KEY } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { currencyFormat } from '@utils/format';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { ResultWithdrawTable } from 'interface/withdraw';
import * as S from './style';

type PropsWithdrawTable = {
  loading: boolean;
  dataWithdraw: ResultWithdrawTable[];
  paginate: PaginationTable;
  onChangePaginate: (value: PaginationChangeType) => void;
  setIdWithdraw: (id: string) => void;
  showModalConfirm: () => void;
};

const WithdrawRequestManagementTable = ({
  loading,
  dataWithdraw,
  paginate,
  onChangePaginate,
  setIdWithdraw,
  showModalConfirm,
}: PropsWithdrawTable) => {
  const columns: ColumnsType<ResultWithdrawTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Current balance',
      dataIndex: 'currentBalance',
      render: (text) => (
        <div style={{ width: 100 }}>{currencyFormat(text || 0)}</div>
      ),
    },
    {
      title: 'Withdraw amount',
      dataIndex: 'withdrawalAmount',
      render: (text) => (
        <div style={{ width: 100 }}>{currencyFormat(text || 0)}</div>
      ),
    },
    {
      title: 'Request date',
      dataIndex: 'requestDate',
      width: 200,
      render: (text) => (
        <div style={{ width: 100 }}>
          {dayjs(text).format('YYYY.MM.DD (ddd) hA')}
        </div>
      ),
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
    },
    {
      title: 'Account number',
      dataIndex: 'accountNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <Status type={STATUS_COLOR[text] ?? ''} label={STATUS[text] ?? ''} />
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record: any, index: number) => {
        return (
          <S.Action>
            <CustomLink
              to={`${ROUTES.WITHDRAW_REQUEST_DETAIL}/${record.id}`}
              style={{ display: 'inline-flex', width: 'auto' }}
            >
              <Eye size={16} />
            </CustomLink>
            {record.status === STATUS_KEY.Pending && (
              <>
                |
                <CustomLink
                  className="approve"
                  to="#"
                  onClick={() => {
                    setIdWithdraw(record?.id);
                    showModalConfirm();
                  }}
                >
                  Approve
                </CustomLink>
              </>
            )}
          </S.Action>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={dataWithdraw}
        footer={() => {
          return (
            <Pagination
              paginationTable={paginate}
              onChangePage={onChangePaginate}
            />
          );
        }}
      />
    </>
  );
};

export default WithdrawRequestManagementTable;
