import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import ModalActionStatus from '@components/common/ModalActionStatus';
import { PaginationChangeType } from '@components/common/Pagination';
import Status from '@components/common/Status';
import ViewAttachment from '@components/common/ViewAttachment';
import TableSellerManagement from '@components/registerSellerManagement/TableSellerManagement';
import { STATUS } from '@constants/codeConstants';
import useAddParams from '@hooks/useAddParams';
import useQueryString from '@hooks/useQueryString';
import registerSellerService from '@services/registerSellerService';
import { H5 } from '@style/DefaultStyled';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { ResponseListModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { RegisterSellerType } from 'interface/registerSeller';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as S from './style';

const RegisterSellerManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { addParamsUrl } = useAddParams();

  /** ******************************** Router **************************************************** */
  const location = useLocation();
  const paramsURL: ObjectLiteral = useQueryString();

  /** ******************************** State **************************************************** */
  const [records, setRecords] = useState<RegisterSellerType[]>([]);
  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);

  const [action, setAction] = useState<{
    requestId: number | undefined;
    type: 'approve' | 'reject' | undefined;
  }>({
    requestId: undefined,
    type: undefined,
  });

  const paramsFiler: ObjectLiteral = {
    offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
    limit: getLimitParam(paramsURL),
    searchText: paramsURL.searchText,
    registerTime: paramsURL?.registerTime || null,
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const res: ResponseListModel<RegisterSellerType> =
        await registerSellerService.get(paramsFiler);

      setRecords(Array.isArray(res?.data?.data) ? res?.data?.data : []);
      setTotalElement(res?.data?.length || 0);
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  /** *
   * Handle fetch data on change: search, paginate
   */
  useEffect(() => {
    fetchData();
  }, [location.search]);

  /** ******************************** Handle filter **************************************************** */

  /** *
   * handle on change pagination
   */
  const handleChangePaginate = (value: PaginationChangeType) => {
    addParamsUrl(value);
  };

  /** * on change filter */
  const onChangeValue = (value: ObjectLiteral) => {
    addParamsUrl({
      ...value,
      page: 1,
    });
  };

  const columnsTable = useMemo(() => {
    const columns: ColumnsType<RegisterSellerType> = [
      {
        title: 'User ID',
        dataIndex: 'userId',
      },
      {
        title: 'Register time ',
        dataIndex: 'requestRegisterTime',
        render: (value: string | number) => {
          return (
            <div>
              <div>{dayjs(value).format('YYYY.MM.DD')}</div>
              <div>{dayjs(value).format('HH:mm:ss')}</div>
            </div>
          );
        },
      },
      {
        title: 'Business registration certificate',
        dataIndex: 'certificateLink',
        render: (value: string) => {
          return value?.length ? (
            <ViewAttachment
              attachments={Array.isArray(value) ? [value] : [value]}
            />
          ) : null;
        },
      },
      {
        title: 'Photo of bankbook',
        dataIndex: 'bankbookLink',
        render: (value: string) => {
          return value?.length ? (
            <ViewAttachment
              attachments={Array.isArray(value) ? [value] : [value]}
            />
          ) : null;
        },
      },
      {
        title: 'Status',
        dataIndex: 'requestStatus',
        align: 'center',
        render: (_: keyof typeof STATUS) => (
          <Status type={_ as string} label={STATUS[_] || ''} />
        ),
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (_, record: RegisterSellerType, index: number) => {
          return (
            <S.Action>
              {record.requestStatus === 'PENDING' && (
                <>
                  <span
                    aria-hidden
                    className="approve"
                    onClick={() => {
                      setAction({
                        requestId: record.requestId,
                        type: 'reject',
                      });
                    }}
                  >
                    Reject
                  </span>
                  |{' '}
                  <span
                    aria-hidden
                    className="approve"
                    onClick={() => {
                      setAction({
                        requestId: record.requestId,
                        type: 'approve',
                      });
                    }}
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
    return columns;
  }, [records]);

  const handleCancelAction = () => {
    setAction({
      requestId: undefined,
      type: undefined,
    });
  };

  /**
   *
   */
  const handleSubmitAction = async (values: { rejectedReason: string }) => {
    setLoading(true);
    try {
      const requestParams = {
        requestId: String(action.requestId),
        status: action.type === 'reject' ? 'REJECTED' : 'APPROVED',
        rejectedReason: values.rejectedReason,
      };

      await registerSellerService.update(requestParams);
      message.success(
        action.type === 'approve' ? 'Approve successful' : 'Reject successful'
      );
      handleCancelAction();
      setLoading(false);

      fetchData();
    } catch (error: any) {
      message.error(error?.message);
      handleCancelAction();
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <H5>SELLER REGISTRATION REQUEST</H5>
      <Form
        form={form}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
        initialValues={{
          searchText: paramsURL?.searchText,
          registerTime: paramsURL?.registerTime
            ? dayjs(paramsURL?.registerTime)
            : null,
        }}
      >
        <S.Filter>
          <div className="filter">
            <div className="search">
              <InputSearch name="searchText" placeholder="Search by user ID" />
            </div>

            <div className="dropdown">
              <DatePickerCustom
                mb="0"
                placeholder="Register time"
                name="registerTime"
              />
            </div>
          </div>
        </S.Filter>
      </Form>

      <div className="table">
        <TableSellerManagement
          loading={loading}
          columns={columnsTable}
          resources={records}
          paginate={{
            length: totalElement,
            limit: getLimitParam(paramsURL),
            page: getPageParam(paramsURL),
          }}
          onChangePaginate={handleChangePaginate}
        />
      </div>

      <ModalActionStatus
        loading={loading}
        open={!!action.requestId}
        type={action.type}
        onCancel={handleCancelAction}
        onSubmit={handleSubmitAction}
      />
    </S.Wrapper>
  );
};

export default RegisterSellerManagement;
