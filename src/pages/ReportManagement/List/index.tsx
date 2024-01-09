import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import ReportManagementTable from '@components/reportManagement/Table';
import useQueryString from '@hooks/useQueryString';
import reportService from '@services/reportService';
import { H5 } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { ObjectLiteral } from 'interface/general';
import { ReportType } from 'interface/report';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const ReportManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parmaURL = useQueryString();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<ReportType[]>([]);

  const [totalElement, setTotalElement] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await reportService.get({
        limit: getLimitParam(parmaURL),
        offset: getOffset(getPageParam(parmaURL), getLimitParam(parmaURL)),
        data: parmaURL?.time || null,
        keyword: parmaURL?.keyword,
      });
      setResources(res?.data?.data || []);
      setTotalElement(res?.data?.length || 0);
    } catch (err) {
      /* tslint:disable:no-empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };

  const onChangeValue = (values: ObjectLiteral) => {
    pushParams(navigate, location, values);
  };

  return (
    <S.Wrapper>
      <H5>REPORT MANAGEMENT</H5>
      <S.Filter>
        <Form
          form={form}
          onValuesChange={onChangeValue}
          onFinish={onChangeValue}
          initialValues={{
            ...parmaURL,
            time: parmaURL?.time ? dayjs(parmaURL?.time) : null,
          }}
        >
          <div className="filter">
            <div className="search">
              <InputSearch
                defaultValue={parmaURL?.keyword}
                placeholder="Search by name..."
              />
            </div>

            <div className="dropdown">
              <Form.Item name="time" style={{ marginBottom: 0, width: 120 }}>
                <DatePickerCustom mb="0" placeholder="Time" name="time" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </S.Filter>
      <div className="table-wrap">
        <ReportManagementTable
          loading={loading}
          resources={resources}
          paginate={{
            length: totalElement,
            limit: getLimitParam(parmaURL),
            page: getPageParam(parmaURL),
          }}
          onChangePaginate={handleChangePaginate}
          callbackSuccess={fetchData}
        />
      </div>
    </S.Wrapper>
  );
};

export default ReportManagement;
