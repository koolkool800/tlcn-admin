import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import { ColumnsType } from 'antd/es/table';
import { PaginateType } from 'interface/general';
import { RegisterSellerType } from 'interface/registerSeller';

type Props = {
  loading: boolean;
  columns: ColumnsType<RegisterSellerType>;
  resources: RegisterSellerType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
};

const TableSellerManagement = (props: Props) => {
  const { columns, resources, paginate, onChangePaginate, loading } = props;

  return (
    <>
      <DataTable
        rowKey="requestId"
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

export default TableSellerManagement;
