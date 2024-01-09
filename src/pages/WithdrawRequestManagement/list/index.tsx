import Button from '@components/common/Button';
import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import Modal from '@components/common/ModalConfirm';
import { PaginationChangeType } from '@components/common/Pagination';
import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import WithdrawRequestManagementTable from '@components/withdrawRequestManagement/Table';
import { STATUS, STATUS_KEY } from '@constants/codeConstants';
import useParam from '@hooks/useParam';
import withdrawService from '@services/withdrawService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { getParamUrl } from '@utils/url';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { ObjectLiteral } from 'interface/general';
import { ResultWithdrawTable } from 'interface/withdraw';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const Status = [
  {
    label: STATUS.APPROVED,
    value: 'APPROVED',
  },
  {
    label: STATUS.PENDING,
    value: 'PENDING',
  },
];

const WithdrawRequestManagement = () => {
  const [form] = Form.useForm();

  const paramUrl = useParam();
  const location = useLocation();
  const navigate = useNavigate();

  const statusValue = getParamUrl('statuses');
  const defaultValue = {
    createdAt: getParamUrl('createdAt')
      ? dayjs(getParamUrl('createdAt'))
      : null,
    keyword: getParamUrl('keyword'),
    statuses: statusValue || undefined,
  };

  const [dataWithdraw, setDataWithdraw] = useState<ResultWithdrawTable[]>([]);
  const [loading, setLoading] = useState(false);

  const [totalElement, setTotalElement] = useState(0);

  const [idWithdraw, setIdWithdraw] = useState<string>('');
  const [approve, setApprove] = useState<boolean>(false);
  const showModalConfirm = () => setApprove(true);
  const closeModalConfirm = () => setApprove(false);

  const fetchDataWithdraw = async () => {
    setLoading(true);
    try {
      const requestParams = {
        ...defaultValue,
        offset: getOffset(getPageParam(paramUrl), getLimitParam(paramUrl)),
        limit: getLimitParam(paramUrl),
        createdAt: getParamUrl('createdAt') || null,
        statuses: getParamUrl('statuses'),
      };

      const res = await withdrawService.getWithdraw(requestParams);
      const newDataWithdraw = res?.data?.data.map((item) => ({
        key: item.id,
        ...item,
      }));

      setDataWithdraw(newDataWithdraw);

      setTotalElement(res?.data?.length || 0);
    } catch (error: any) {
      message.success(error?.message);
    }
    setLoading(false);
  };

  const onChangeValue = (value: ObjectLiteral) => {
    pushParams(navigate, location, { ...value, page: 1 });
  };

  useEffect(() => {
    fetchDataWithdraw();
  }, [location.search]);

  /** *
   * handle on change pagination
   */
  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };

  const handleApprovalWithdraw = async (id: string): Promise<void> => {
    try {
      const res = await withdrawService.approvalWithdraw(String(id));
      message.success(res.message);
      closeModalConfirm();
      fetchDataWithdraw();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <S.Wrapper>
      <H5>WITHDRAW REQUEST MANAGEMENT</H5>
      <Form
        name="withdraw-request-management"
        form={form}
        initialValues={defaultValue}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
      >
        <div className="filter">
          <InputSearch
            defaultValue={getParamUrl('keyword')}
            placeholder="Search by name..."
          />

          <Form.Item name="statuses" style={{ marginBottom: 0 }}>
            <Select
              allowClear
              placeholder="Status"
              options={Status}
              style={{ minWidth: 116 }}
            >
              {Status.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <span>
            <DatePickerCustom name="createdAt" mb="0" />
          </span>
        </div>
      </Form>

      <div className="table">
        <WithdrawRequestManagementTable
          loading={loading}
          dataWithdraw={dataWithdraw}
          paginate={{
            length: totalElement,
            limit: getLimitParam(paramUrl),
            page: getPageParam(paramUrl),
          }}
          onChangePaginate={handleChangePaginate}
          setIdWithdraw={setIdWithdraw}
          showModalConfirm={showModalConfirm}
        />

        <Modal isOpen={approve} onCancel={closeModalConfirm} hiddenIcon={false}>
          <S.ModalContent>
            <H5>Confirm</H5>
            <div className="desc">Are you sure approve withdrawal request?</div>
            <div className="footer">
              <Button loading={loading} onClick={closeModalConfirm}>
                Close
              </Button>
              <PrimaryButton
                loading={loading}
                onClick={() => handleApprovalWithdraw(idWithdraw)}
              >
                Approve
              </PrimaryButton>
            </div>
          </S.ModalContent>
        </Modal>
      </div>
    </S.Wrapper>
  );
};

export default WithdrawRequestManagement;
