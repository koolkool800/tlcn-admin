/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Button from '@components/common/Button';
import DataTable from '@components/common/DataTable';
import Modal from '@components/common/ModalConfirm';
import Pagination, {
  PaginationChangeType,
} from '@components/common/Pagination';
import Select from '@components/common/Select';
import Status from '@components/common/Status';
import ViewAttachment from '@components/common/ViewAttachment';
import { CategoryBanner } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import bannerService from '@services/bannerService';
import { ActionView, H5 } from '@style/DefaultStyled';
import { capitalize } from '@utils/format';
import { Form, FormInstance, Tooltip, message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { Eye, Trash } from 'iconsax-react';
import { BannerResponseResult, BannerStatus } from 'interface/banner';
import { ObjectLiteral, PaginateType } from 'interface/general';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type BannerTableProps = {
  resources: BannerResponseResult[];
  paginate: PaginateType;
  onChangePaginate: (value: PaginationChangeType) => void;
  loading: boolean;
  fetchData?: () => Promise<void>;
  isEditing: boolean;
  form?: FormInstance;
  setLoading?: (loading: boolean) => void;
};

const OPTION_POSITIONS = {
  primary: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ],
  sub: [1, 2, 3, 4],
};

export default function BannerManagementTable({
  loading,
  onChangePaginate,
  paginate,
  resources,
  fetchData,
  isEditing,
  form,
  setLoading,
}: BannerTableProps) {
  const theme = useTheme() as DefaultTheme;
  const location = useLocation();
  const paramsURL: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });
  const [positionOptions, setPositionOptions] = useState<DefaultOptionType[]>(
    []
  );
  const [modelAction, setModalAction] = useState<BannerResponseResult | null>(
    null
  );

  const loadPosition = async () => {
    if (
      paramsURL?.category === CategoryBanner.PRIMARY ||
      !paramsURL?.category
    ) {
      setPositionOptions(
        OPTION_POSITIONS.primary.map((item: number) => ({
          label: item,
          value: item,
        }))
      );
    }
    if (paramsURL?.category === CategoryBanner.SUB) {
      setPositionOptions(
        OPTION_POSITIONS.sub.map((item: number) => ({
          label: item,
          value: item,
        }))
      );
    }
  };
  const handleAction = async (
    actionType: 'update' | 'delete',
    id: string,
    status?: keyof typeof BannerStatus
  ) => {
    switch (actionType) {
      case 'update':
        try {
          const res = await bannerService.updateBanner({ id, status });
          message.success(res?.message);
          if (fetchData) {
            fetchData();
          }
        } catch (error: any) {
          message.error(error?.message);
        }
        break;
      case 'delete':
        if (setLoading) setLoading(true);
        try {
          const res = await bannerService.deleteBanner({ id });
          message.success(res?.message);
          if (fetchData) {
            setModalAction(null);
            fetchData();
          }
        } catch (error: any) {
          message.error(error?.message);
        }

        if (setLoading) setLoading(false);
        break;

      default:
        break;
    }
  };

  const columns: ColumnsType<BannerResponseResult> = [
    {
      title: 'Banner',
      dataIndex: 'banner',
      render(value) {
        return <ViewAttachment attachments={[value]} />;
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      align: 'center',
      render(value, record) {
        form?.setFieldValue(record.id, record.position);
        return isEditing ? (
          <Form.Item required name={record.id} className="select-item">
            <Select className="cate-select" options={positionOptions} />
          </Form.Item>
        ) : (
          value
        );
      },
      width: 100,
    },
    {
      title: 'Link',
      dataIndex: 'link',
      width: 200,
      render: (value: string) => (
        <div className="three-dot">
          <Tooltip placement="top" title={value}>
            {value?.slice(0, 40)}
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Created time',
      dataIndex: 'createdDate',
      width: 200,
      render(value) {
        return (
          <div style={{ width: 120 }}>
            {dayjs(value).format('YYYY.MM.DD (ddd) hA')}
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 200,
      align: 'center',
      render: (value: string) => <div>{capitalize(value?.toLowerCase())}</div>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      render(value) {
        return value === BannerStatus.ACTIVE ? (
          <Status
            label={capitalize(BannerStatus.ACTIVE?.toLowerCase())}
            type={BannerStatus.ACTIVE}
          />
        ) : (
          <Status
            label={capitalize(BannerStatus.INACTIVE?.toLowerCase())}
            type={BannerStatus.INACTIVE}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: 200,
      render(value, record) {
        return (
          <S.TableActions>
            <div
              className="action"
              onClick={() =>
                handleAction(
                  'update',
                  record.id,
                  record.status === BannerStatus.ACTIVE
                    ? BannerStatus.INACTIVE
                    : BannerStatus.ACTIVE
                )
              }
            >
              {record.status === BannerStatus.ACTIVE
                ? capitalize(BannerStatus.INACTIVE?.toLowerCase())
                : capitalize(BannerStatus.ACTIVE?.toLowerCase())}
            </div>
            |
            <div className="action">
              <Link
                to={`${ROUTES.BANNER_MANAGEMENT}/${value}?edit&category=${record.category}`}
              >
                Edit{' '}
              </Link>
            </div>
            |
            <ActionView to={`${ROUTES.BANNER_MANAGEMENT}/${record.id}`}>
              <Eye size={20} />
            </ActionView>
            |
            <div
              className="action"
              onClick={() => {
                // handleAction('delete', record.id);
                setModalAction(record);
              }}
            >
              <Trash size={20} color={theme.colors.emphasisLightHigh} />
            </div>
          </S.TableActions>
        );
      },
    },
  ];

  useEffect(() => {
    loadPosition();
  }, [location.search]);

  return (
    <S.Wrapper>
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
      <Modal
        isOpen={modelAction !== null}
        onCancel={() => setModalAction(null)}
        hiddenIcon={false}
      >
        <S.WrapperModalDelete>
          <H5>Confirm</H5>
          <div className="desc">Are you sure delete banner?</div>
          <div className="action">
            <Button loading={loading} onClick={() => setModalAction(null)}>
              Cancel
            </Button>
            <Button
              loading={loading}
              bgcolor={theme.colors.emphasisLightHigh}
              onClick={() =>
                handleAction('delete', String(modelAction?.id || ''))
              }
            >
              Delete
            </Button>
          </div>
        </S.WrapperModalDelete>
      </Modal>
    </S.Wrapper>
  );
}
