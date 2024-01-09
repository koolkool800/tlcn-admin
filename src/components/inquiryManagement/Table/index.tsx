import DataTable from '@components/common/DataTable';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import { InquiryStatusLabel } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import { capitalize } from '@utils/format';
import { getPage } from '@utils/table';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye } from 'iconsax-react';
import { PaginateType } from 'interface/general';
import { InquiryType } from 'interface/inquiry';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

type Props = {
  resources: InquiryType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
};

const InquiryManagementTable = ({
  resources,
  paginate,
  onChangePaginate,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const columns: ColumnsType<InquiryType> = [
    {
      title: 'No',
      render: (_, __, index: number) => {
        return (
          <div style={{ width: 60 }}>
            {(paginate.page - 1) * paginate.limit + (index + 1)}
          </div>
        );
      },
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: (_) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Sending time',
      dataIndex: 'createdAt',
      render: (_: string) => {
        return (
          <div style={{ width: 140 }}>
            {dayjs(_).format('DD.MM.YYYY (ddd) h:mm A')}
          </div>
        );
      },
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      render: (_) => {
        return <div style={{ width: 160 }}>{_}</div>;
      },
    },
    {
      title: 'Replay time',
      dataIndex: 'replyTime',
      render: (_: string) => {
        return _ ? (
          <div style={{ width: 140 }}>
            {dayjs(_).format('DD.MM.YYYY (ddd) h:mm A')}
          </div>
        ) : null;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: keyof typeof InquiryStatusLabel) => {
        return (
          <S.Status status={value}>
            <>
              <div className="dot" />
              <span>{capitalize(value?.toLowerCase())}</span>
            </>
          </S.Status>
        );
      },
    },

    {
      title: 'Action',
      dataIndex: '',
      render: (_: keyof typeof InquiryStatusLabel, record: InquiryType) => (
        <S.Action>
          <Eye
            size={16}
            onClick={() =>
              navigate(`${ROUTES.INQUIRY_MANAGEMENT}/${record?.id}/view`)
            }
          />{' '}
          {record.status === 'PENDING' && (
            <>
              <span>|</span>{' '}
              <span
                aria-hidden
                className="action"
                onClick={() =>
                  navigate(`${ROUTES.INQUIRY_MANAGEMENT}/${record?.id}/reply`)
                }
              >
                Reply
              </span>
            </>
          )}
        </S.Action>
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

export default InquiryManagementTable;
