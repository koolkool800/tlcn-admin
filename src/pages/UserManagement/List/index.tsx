import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import TableUserManagement from '@components/userManagement/Table';
import useQueryString from '@hooks/useQueryString';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import { ResponseListModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const UserManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  /** * Handle Route */
  const location = useLocation();
  const navigate = useNavigate();
  const paramsURL: ObjectLiteral = useQueryString();

  /** * Handle State */
  const [users, setUsers] = useState<UserType[]>([]);

  const [loading, setLoading] = useState(false);
  const [totalElement, setTotalElement] = useState(0);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res: ResponseListModel<UserType> = await userService.get({
        offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
        limit: getLimitParam(paramsURL),
        sortBy: paramsURL.sortBy,
        keyword: paramsURL.keyword,
      });

      setUsers(res?.data?.data || []);
      setTotalElement(res?.data?.length || 0);
    } catch (error: any) {
      message.success(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  /** *
   * Handle fetch data on change: search, paginate
   */
  useEffect(() => {
    fetchUser();
  }, [location.search]);

  /** *
   * handle on change search input
   */
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
      <H5>USER MANAGEMENT</H5>
      <Form
        form={form}
        onFinish={handleChangeSearch}
        initialValues={{
          keyword: paramsURL?.keyword,
        }}
      >
        <div className="filter">
          <div className="search">
            <InputSearch placeholder="Search by name, phone number..." />
          </div>
        </div>
      </Form>

      <div className="table">
        <TableUserManagement
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

export default UserManagement;
