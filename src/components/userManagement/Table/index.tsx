import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import { ROUTES } from '@constants/routes';
import { ActionView } from '@style/DefaultStyled';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { PaginateType } from 'interface/general';
import { UserType } from 'interface/user';

const columns: ColumnsType<UserType> = [
  {
    title: 'User ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 200,
    render: (_: string, record: UserType) => {
      return <div style={{ width: 200 }}>{record.name}</div>;
    },
  },

  {
    title: 'Level',
    dataIndex: 'level',
    align: 'center',
    render: (_: string) => {
      return <div style={{ width: 80, textAlign: 'center' }}>{_}</div>;
    },
  },
  {
    title: 'Seller category',
    dataIndex: 'sellerCategory',
    render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: (_: string, record: UserType) => {
      return <div style={{ width: 150 }}>{record.email}</div>;
    },
  },
  {
    title: 'Date of birth',
    dataIndex: 'dob',
    width: 200,
    render: (_: string, record: UserType) => {
      return (
        <div style={{ width: 150 }}>
          {record.dob ? dayjs(record.dob).format('DD.MM.YYYY') : null}
        </div>
      );
    },
  },
  {
    title: 'Address',
    dataIndex: 'account',
    width: 200,
    render: (_: string, record: UserType) => {
      const addressArr: string[] = [];

      return (
        <div style={{ width: 200 }}>
          {[
            record?.addressDefault?.address,
            record?.addressDefault?.detailAddress,
          ]
            ?.filter((s) => s?.trim())
            ?.join(', ')}
        </div>
      );
    },
  },
  {
    title: 'Regis Info',
    dataIndex: 'accountType',
    render: (value: string) => <div style={{ width: 120 }}>{value}</div>,
  },
  {
    title: 'Status',
    dataIndex: '',
    render: (_: string, record: UserType) => {
      return 'Active';
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    render: (_: string, record: UserType) => {
      return (
        <ActionView to={`${ROUTES.USER_MANAGEMENT}/${record.id}`}>
          <Eye size={20} />
        </ActionView>
      );
    },
  },
];

type Props = {
  resources: UserType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const TableUserManagement = ({
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

export default TableUserManagement;
