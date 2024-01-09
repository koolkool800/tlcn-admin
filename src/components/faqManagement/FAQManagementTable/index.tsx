/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Button from '@components/common/Button';
import DataTable from '@components/common/DataTable';
import Modal from '@components/common/ModalConfirm';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Status from '@components/common/Status';
import { ROUTES } from '@constants/routes';
import faqService from '@services/faqServices';
import { ActionView, H5 } from '@style/DefaultStyled';
import { capitalize } from '@utils/format';
import { message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye, Trash } from 'iconsax-react';
import { FaqStatus, FaqsResponseType } from 'interface';
import { PaginateType } from 'interface/general';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type FAQManagementTableProps = {
  resources: FaqsResponseType[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
  fetchData?: () => Promise<void>;
  setLoading: (loading: boolean) => void;
};
export default function FAQManagementTable({
  loading,
  onChangePaginate,
  paginate,
  resources,
  fetchData,
  setLoading,
}: FAQManagementTableProps) {
  const theme = useTheme() as DefaultTheme;
  const [modelAction, setModalAction] = useState<FaqsResponseType | null>(null);

  const handleAction = async (
    actionType: 'update' | 'delete',
    id: string,
    status?: keyof typeof FaqStatus
  ) => {
    setLoading(true);
    switch (actionType) {
      case 'update':
        try {
          const res = await faqService.updateFaq({ id, status });
          message.success(res?.message);
          if (fetchData) {
            fetchData();
          }
        } catch (error: any) {
          message.error(error?.message);
        }
        break;
      case 'delete':
        try {
          const res = await faqService.deleteFaq(id);
          message.success('Delete FAQ successful');
          if (fetchData) {
            fetchData();
          }
        } catch (error: any) {
          message.error(error?.message);
        }
        setModalAction(null);
        break;

      default:
        break;
    }

    setLoading(false);
  };

  const columns: ColumnsType<FaqsResponseType> = [
    {
      title: 'No',
      width: 60,
      render: (_, __, index: number) => {
        return (
          <div style={{ width: 60 }}>
            {(paginate.page - 1) * paginate.limit + (index + 1)}
          </div>
        );
      },
    },
    {
      title: 'Question Eng',
      dataIndex: 'faqEngQuestion',
      width: 200,
      render: (_, __, index: number) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Question Kor',
      dataIndex: 'faqKorQuestion',
      width: 200,
      render: (_, __, index: number) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Answer Eng',
      dataIndex: 'faqEngAnswer',
      width: 200,
      render: (_, __, index: number) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Answer Kor',
      dataIndex: 'faqKorAnswer',
      width: 200,
      render: (_, __, index: number) => {
        return <div style={{ width: 200 }}>{_}</div>;
      },
    },
    {
      title: 'Created time',
      dataIndex: 'faqCreatedTime',
      width: 200,
      render(value) {
        return dayjs(value).format('YYYY.MM.DD (ddd) hA');
      },
    },
    {
      title: 'Category',
      dataIndex: 'faqCategoryName',
      render: (value: string) => <div style={{ width: 100 }}>{value}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'faqStatus',
      width: 200,
      render(value) {
        return value === FaqStatus.ACTIVE ? (
          <Status
            label={capitalize(FaqStatus.ACTIVE?.toLowerCase())}
            type={FaqStatus.ACTIVE}
          />
        ) : (
          <Status
            label={capitalize(FaqStatus.INACTIVE?.toLowerCase())}
            type={FaqStatus.INACTIVE}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'faqId',
      width: 200,
      render(value, record) {
        return (
          <div className="action-faq">
            <div
              className="text"
              onClick={() =>
                handleAction(
                  'update',
                  record.faqId,
                  record.faqStatus === FaqStatus.ACTIVE
                    ? FaqStatus.INACTIVE
                    : FaqStatus.ACTIVE
                )
              }
            >
              {record.faqStatus === FaqStatus.ACTIVE
                ? capitalize(FaqStatus.INACTIVE?.toLowerCase())
                : capitalize(FaqStatus.ACTIVE?.toLowerCase())}
            </div>
            |
            <div className="text">
              <Link to={`${ROUTES.FAQ_MANAGEMENT}/${record.faqId}?update`}>
                Edit
              </Link>
            </div>
            |
            <ActionView to={`${ROUTES.FAQ_MANAGEMENT}/${record.faqId}`}>
              <Eye size={20} />
            </ActionView>
            <Trash
              cursor="pointer"
              size={20}
              color="#ff0000"
              onClick={() => setModalAction(record)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataTable
        loading={loading}
        columns={columns}
        data={resources}
        rowKey="faqId"
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

      <Modal
        isOpen={modelAction !== null}
        onCancel={() => setModalAction(null)}
        hiddenIcon={false}
      >
        <S.WrapperModalDelete>
          <H5>Confirm</H5>
          <div className="desc">Are you sure delete FAQ?</div>
          <div className="action">
            <Button loading={loading} onClick={() => setModalAction(null)}>
              Cancel
            </Button>
            <Button
              loading={loading}
              bgcolor={theme.colors.emphasisLightHigh}
              onClick={() =>
                handleAction('delete', String(modelAction?.faqId || ''))
              }
            >
              Delete
            </Button>
          </div>
        </S.WrapperModalDelete>
      </Modal>
    </>
  );
}
