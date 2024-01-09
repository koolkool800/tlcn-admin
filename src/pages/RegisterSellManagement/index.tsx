import DownloadIcon from '@assets/images/download.png';
import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import Select from '@components/common/Select';
import RegisterSellManagerTable from '@components/registerSellManagement/Table';
import { TicketStatusLabel } from '@constants/codeConstants';
import useQueryString from '@hooks/useQueryString';
import registerToSellService from '@services/registerToSellService';
import { H5 } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { ResponseListModel, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { RegisterToSellType } from 'interface/registerToSell';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const RegisterSellManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  /** ******************************** Router **************************************************** */
  const location = useLocation();
  const navigate = useNavigate();
  const paramsURL: ObjectLiteral = useQueryString();

  /** ******************************** State **************************************************** */
  const [records, setRecords] = useState<RegisterToSellType[]>([]);
  const [performers, setPerformers] = useState<string[]>([]);

  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);

  /** ******************************** Fetch data **************************************************** */
  const fetchFilter = async () => {
    try {
      const res: ResponseModel<{ performers: string[] }> =
        await registerToSellService.getFilter();

      setPerformers(res?.data?.performers || []);
    } catch (err) {
      /* empty */
    }
  };

  const paramsFiler: ObjectLiteral = {
    offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
    limit: getLimitParam(paramsURL),
    keyword: paramsURL.keyword,
    status: paramsURL?.status,
    performanceTime: paramsURL?.performanceTime || null,
    registerTime: paramsURL?.registerTime || null,
    performers: paramsURL?.performers,
  };

  const fetchData = async (isExport = false) => {
    setLoading(true);

    try {
      const res: ResponseListModel<RegisterToSellType> =
        await registerToSellService.get(paramsFiler);

      setRecords(Array.isArray(res?.data?.data) ? res?.data?.data : []);
      setTotalElement(res?.data?.length || 0);
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  /** ******************************** Side effect **************************************************** */
  useEffect(() => {
    fetchFilter();
  }, []);

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
    pushParams(navigate, location, value as ObjectLiteral);
  };

  /** * on change filter */
  const onChangeValue = (value: ObjectLiteral) => {
    pushParams(navigate, location, {
      ...value,
      page: 1,
    });
  };

  /** ******************************** Export file **************************************************** */
  const handleExportExcel = async () => {
    setLoading(true);
    try {
      const res: any = await registerToSellService.get(
        {
          ...paramsFiler,
          isExportFile: true,
        },
        {
          'Content-Type': 'text/csv; charset=utf-8',
        }
      );
      const blob = new Blob([res], {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(blob, `REGISTER_SELL${dayjs().format('YYYY-MM-DD')}.csv`);
    } catch (error) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <S.Wrapper>
      <H5>REGISTER SELL MANAGEMENT</H5>
      <Form
        form={form}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
        initialValues={{
          keyword: paramsURL?.keyword,
          status: paramsURL?.status || null,
          performers: paramsURL?.performers || null,
          performanceTime: paramsURL?.performanceTime
            ? dayjs(paramsURL?.performanceTime)
            : null,
          registerTime: paramsURL?.registerTime
            ? dayjs(paramsURL?.registerTime)
            : null,
        }}
      >
        <S.Filter>
          <div className="filter">
            <div className="search">
              <InputSearch placeholder="Search by name..." />
            </div>
            <div className="dropdown">
              <Form.Item name="status" style={{ marginBottom: 0, width: 160 }}>
                <Select
                  allowClear
                  placeholder="Status"
                  options={Object.entries(TicketStatusLabel).map(
                    ([value, label]) => ({ label, value })
                  )}
                />
              </Form.Item>
            </div>

            <div className="dropdown">
              <Form.Item
                name="performers"
                style={{ marginBottom: 0, width: 160 }}
              >
                <Select
                  allowClear
                  placeholder="Performer"
                  options={performers?.map((item: string) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="dropdown">
              <Form.Item
                name="performanceTime"
                style={{ marginBottom: 0, width: 160 }}
              >
                <DatePickerCustom
                  mb="0"
                  placeholder="Performer time"
                  name="performanceTime"
                />
              </Form.Item>
            </div>

            <div className="dropdown">
              <Form.Item
                name="registerTime"
                style={{ marginBottom: 0, width: 160 }}
              >
                <DatePickerCustom
                  mb="0"
                  placeholder="Register time"
                  name="registerTime"
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <S.ExportButton
              loading={loading}
              icon={<img src={DownloadIcon} alt="download icon" />}
              onClick={handleExportExcel}
            >
              Export
            </S.ExportButton>
          </div>
        </S.Filter>
      </Form>

      <div className="table">
        <RegisterSellManagerTable
          loading={loading}
          resources={records}
          paginate={{
            length: totalElement,
            limit: getLimitParam(paramsURL),
            page: getPageParam(paramsURL),
          }}
          onChangePaginate={handleChangePaginate}
        />
      </div>
    </S.Wrapper>
  );
};

export default RegisterSellManagement;
