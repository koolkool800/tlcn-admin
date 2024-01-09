import { TableProps } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import Pagination, { PaginationTable } from '../Pagination';
import * as S from './style';

interface PropsTable extends TableProps<any> {
  columns: any[];
  data: any[];
  hiddenPagination?: boolean;
  pageTable?: PaginationTable;
  handleChangePage?: ({ page, limit }: { page: number; limit: number }) => void;
  rowKey?: string;
  rowSelection?: any;
}

const DataTable = ({
  columns,
  data,
  hiddenPagination = false,
  pageTable,
  handleChangePage,
  rowKey = 'id',
  rowSelection,
  ...restProps
}: PropsTable) => {
  return (
    <>
      <S.TableAnt
        {...restProps}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={rowKey}
        rowSelection={rowSelection}
      />
      {!hiddenPagination && pageTable && (
        <Pagination
          paginationTable={pageTable}
          onChangePage={handleChangePage}
        />
      )}
    </>
  );
};

export default DataTable;
