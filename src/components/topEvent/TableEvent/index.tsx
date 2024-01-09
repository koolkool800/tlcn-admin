import DataTable from '@components/common/DataTable';

import Status from '@components/common/Status';
import { EventTypeLabel } from '@constants/codeConstants';
import { Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RowSelectMethod } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { AllTopEventsForSelectResponse } from 'interface';
import { PaginateType } from 'interface/general';
import { Key } from 'react';

const columns: ColumnsType<AllTopEventsForSelectResponse> = [
  {
    title: 'Event ID',
    dataIndex: 'eventId',
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
    title: 'Event type',
    dataIndex: 'eventType',
    render: (_: keyof typeof EventTypeLabel) => {
      return <div style={{ width: 120 }}>{EventTypeLabel[_]}</div>;
    },
  },
  {
    title: 'Performer',
    dataIndex: 'eventPerformer',
    render: (_: string) => {
      return <div style={{ width: 120 }}>{_}</div>;
    },
  },
  {
    title: 'Performance time',
    dataIndex: 'eventPerformanceTime',
    render: (_: string) => {
      return (
        <>
          <div style={{ width: 180 }}>
            {dayjs(_).format('YYYY.MM.DD (ddd)')}
          </div>
          <div style={{ width: 180 }}>{dayjs(_).format('h:mm A')}</div>
        </>
      );
    },
  },
  {
    title: 'Place',
    dataIndex: 'eventPlace',
    render: (_: string) => {
      return <div style={{ width: 120 }}>{_}</div>;
    },
  },
  {
    title: 'Views',
    dataIndex: 'eventViews',
    render: (_: string) => {
      return (
        <div style={{ width: 50 }}>
          <img src={_} alt="" />
        </div>
      );
    },
  },
  {
    title: 'Thumbnail',
    dataIndex: 'eventThumbnail',
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
    render: (_: string) => {
      return <Status label="ACTIVE" type="ACTIVE" />;
    },
  },
];

type Props = {
  resources: AllTopEventsForSelectResponse[];
  paginate: PaginateType;
  onChangePaginate: (page: number, pageSize: number) => void;
  loading: boolean;
  onRowChange?: (
    selectedRowKeys: Key[],
    selectedRows: AllTopEventsForSelectResponse[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  selectedKeys?: Key[];
};

const TableEvent = ({
  resources,
  paginate,
  onChangePaginate,
  loading,
  onRowChange,
  selectedKeys,
}: Props) => {
  return (
    <DataTable
      rowSelection={{
        type: 'radio',
        onChange: onRowChange,
        selectedRowKeys: selectedKeys,
      }}
      rowKey="eventId"
      loading={loading}
      columns={columns}
      data={resources}
      footer={() => {
        return (
          <Pagination
            onChange={onChangePaginate}
            current={Number(paginate.offset || 0) / paginate.limit + 1}
            total={paginate.length}
            pageSize={paginate.limit}
            showSizeChanger={false}
          />
        );
      }}
    />
  );
};

export default TableEvent;
