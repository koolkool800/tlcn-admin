import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import ViewAttachment from '@components/common/ViewAttachment';
import { capitalize } from '@utils/format';
import dayjs from 'dayjs';
import { PaginateType } from 'interface/general';
import { ReportType } from 'interface/report';
import { useState } from 'react';
import ModalAction from '../ModalAction';
import * as S from './style';

type Props = {
  resources: ReportType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
  callbackSuccess: () => void;
};

const ReportManagementTable = (props: Props) => {
  const { resources, paginate, onChangePaginate, loading, callbackSuccess } =
    props;
  const [action, setAction] = useState<{
    model: ReportType | null;
    type: 'approve' | 'reject' | null;
  }>({
    model: null,
    type: null,
  });

  const columns = [
    {
      title: 'Report ID',
      dataIndex: 'reportId',
      render: (value: string | number) => {
        return <div style={{ width: 80 }}>{value}</div>;
      },
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      render: (value: string | number) => {
        return <div style={{ width: 80 }}>{value}</div>;
      },
    },
    {
      title: 'Buyer ID',
      dataIndex: 'buyerId',
      render: (value: string | number) => {
        return <div style={{ width: 80 }}>{value}</div>;
      },
    },
    {
      title: 'Seller ID',
      dataIndex: 'sellerId',
      render: (value: string | number) => {
        return <div style={{ width: 80 }}>{value}</div>;
      },
    },
    {
      title: 'Report time',
      dataIndex: 'reportTime',
      render: (value: string | number) => {
        return (
          <div style={{ width: 80 }}>
            <div>{dayjs(value).format('YYYY.MM.DD')}</div>
            <div>{dayjs(value).format('HH:mm:ss')}</div>
          </div>
        );
      },
    },
    {
      title: 'Detail report',
      dataIndex: 'detailReport',
      render: (value: string | number) => {
        return <div style={{ width: 150 }}>{value}</div>;
      },
    },
    {
      title: 'Proof',
      dataIndex: 'proofs',
      render: (value: string) => {
        return value?.length ? (
          <div style={{ width: 120 }}>
            <ViewAttachment attachments={Array.isArray(value) ? value : []} />
          </div>
        ) : null;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: string, record: ReportType) => {
        return (
          <Status
            type={record?.status?.toLowerCase()}
            label={capitalize(record?.status?.toLowerCase())}
          />
        );
      },
    },
    {
      title: 'Reject reason',
      dataIndex: 'rejectedReason',
      render: (value: string | number) => {
        return <div style={{ width: 120 }}>{value}</div>;
      },
    },
    {
      title: 'Action',
      render: (_: string, record: ReportType) => {
        return (
          <S.Action>
            {record.status === 'PENDING' && (
              <>
                {/* <span aria-hidden className="approve action-view">
                  <Eye size={20} />
                </span>
                | */}
                <span
                  aria-hidden
                  className="approve"
                  onClick={() =>
                    setAction({
                      model: record,
                      type: 'reject',
                    })
                  }
                >
                  Reject
                </span>
                |{' '}
                <span
                  aria-hidden
                  className="approve"
                  onClick={() =>
                    setAction({
                      model: record,
                      type: 'approve',
                    })
                  }
                >
                  Approve
                </span>
              </>
            )}
          </S.Action>
        );
      },
    },
  ];

  return (
    <div>
      <ModalAction
        model={action.model as ReportType}
        open={action?.model !== null}
        setOpen={() => {
          setAction({
            model: null,
            type: null,
          });
        }}
        type={action.type}
        callbackSuccess={() => {
          callbackSuccess();
        }}
      />
      <DataTable
        rowKey="reportId"
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
    </div>
  );
};

export default ReportManagementTable;
