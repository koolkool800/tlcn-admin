import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { PaginateType } from 'interface/general';
import { EventDetail } from 'interface/navigation';
import { UpdateEvent } from '../ModalSelectEvents';

type NavigationEventTableProps = {
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: (key: React.Key[]) => void;
  setSelectedEvent: (value: UpdateEvent[]) => void;
  loading: boolean;
  hasPushParams: boolean;
  resources: any;
  paginate: PaginateType;
  onChangePaginate?: (value: PaginationChangeType) => void;
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

const TableModalSelectEvent = ({
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectedEvent,
  loading,
  hasPushParams,
  paginate,
  resources,

  onChangePaginate,
}: NavigationEventTableProps) => {
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelectionConfig: TableRowSelection<EventDetail> = {
    preserveSelectedRowKeys: true,
    type: 'checkbox',
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (
      record: EventDetail,
      selected: boolean,
      selectedRows: EventDetail[]
    ) => {
      if (selectedRows?.length <= 0) {
        const transformData = resources?.map((data: EventDetail) => ({
          id: data.id,
          belongNavCateId: false,
        }));
        setSelectedEvent(transformData);
      } else {
        const transformData = resources?.map((item: EventDetail) => {
          const selectedItem = selectedRows.find((row) => row.id === item.id);
          if (selectedItem) {
            return {
              id: item.id,
              belongNavCateId: selectedItem.id === item.id,
            };
          }
          return {
            id: item.id,
            belongNavCateId: false,
          };
        });
        setSelectedEvent(transformData);
      }
    },
    onSelectAll: (
      selected: boolean,
      selectedRows: EventDetail[],
      changeRows: EventDetail[]
    ) => {
      if (selected) {
        const transformData = selectedRows?.map((event) => ({
          id: event.id,
          belongNavCateId: selected,
        }));

        setSelectedEvent(transformData);
      } else {
        const transformData = changeRows?.map((event) => ({
          id: event.id,
          belongNavCateId: selected,
        }));
        setSelectedEvent(transformData);
      }
    },
  };

  return (
    <DataTable
      loading={loading}
      columns={columns}
      data={resources}
      rowSelection={rowSelectionConfig}
      footer={() => {
        return (
          <Pagination
            hasPushParams={hasPushParams}
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

export default TableModalSelectEvent;
