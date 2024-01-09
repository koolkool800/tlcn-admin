import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { PaginateType } from 'interface/general';
import { EventDetail } from 'interface/navigation';

type NavigationEventTableProps = {
  loading: boolean;
  resources: any;
  paginate: PaginateType;
  onChangePaginate?: (value: PaginationChangeType) => void;
  scroll?: any;
};
const columns: ColumnsType<EventDetail> = [
  {
    title: 'Event ID',
    dataIndex: 'id',
  },
  {
    title: 'Event name',
    dataIndex: 'eventName',
    render(value) {
      return <div style={{ width: 160 }}>{value}</div>;
    },
  },
  {
    title: 'Event type',
    dataIndex: 'eventType',
    width: 250,
  },
  {
    title: 'Performer',
    dataIndex: 'performer',
  },
  {
    title: 'Performance time',
    dataIndex: 'performanceTime',
    render(value) {
      return dayjs(value).format('YYYY.MM.DD (ddd) hA');
    },
  },
  {
    title: 'Place',
    dataIndex: 'place',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    render: (_: string) => {
      return (
        <div style={{ width: 50 }}>
          <img src={_} alt="" />
        </div>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render(value) {
      return <Status label={value} type={value} />;
    },
  },
];

const DataTableNavigation = ({
  loading,
  onChangePaginate,
  paginate,
  resources,
  scroll,
}: NavigationEventTableProps) => {
  return (
    <DataTable
      loading={loading}
      columns={columns}
      data={resources}
      scroll={scroll}
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
  );
};

export default DataTableNavigation;
