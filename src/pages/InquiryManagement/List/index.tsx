import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';

import InquiryManagementTable from '@components/inquiryManagement/Table';
import useQueryString from '@hooks/useQueryString';
import inquiryService from '@services/inquiryService';
import { H5 } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import { ResponseListModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { InquiryType } from 'interface/inquiry';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const InquiryManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const paramsURL: ObjectLiteral = useQueryString();

  const [users, setUsers] = useState<InquiryType[]>([]);

  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const paramsFiler: ObjectLiteral = {
      offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
      limit: getLimitParam(paramsURL),
      sortBy: paramsURL.sortBy,
      keyword: paramsURL.keyword,
    };

    try {
      const res: ResponseListModel<InquiryType> = await inquiryService.get(
        paramsFiler
      );

      setUsers(res?.data?.data || []);
      setTotalElement(res?.data?.length);
    } catch (error: any) {
      message.success(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  /** *
   * Handle fetch data on change: search, paginate
   */
  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleChangeSearch = (values: ObjectLiteral) => {
    pushParams(navigate, location, {
      ...values,
      page: 1,
    });
  };

  /** *
   * handle on change pagination
   */
  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };

  return (
    <S.Wrapper>
      <H5>1:1 INQUIRY MANAGEMENT</H5>
      <S.Filter>
        <Form form={form} onFinish={handleChangeSearch}>
          <div className="filter">
            <div className="search">
              <InputSearch
                defaultValue={paramsURL?.keyword}
                placeholder="Search by name, phone number"
              />
            </div>
          </div>
        </Form>
      </S.Filter>

      <div className="table">
        <InquiryManagementTable
          loading={loading}
          resources={users}
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

export default InquiryManagement;
