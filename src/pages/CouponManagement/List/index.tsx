import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import Select from '@components/common/Select';
import CouponManagementTable from '@components/couponManagement/Table';
import { VoucherCategoryLabel } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useQueryString from '@hooks/useQueryString';
import couponService from '@services/couponService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import { Add } from 'iconsax-react';
import { ResponseListModel } from 'interface';
import { CouponResponseType } from 'interface/coupon';
import { ObjectLiteral } from 'interface/general';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const CouponManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const paramsURL: ObjectLiteral = useQueryString();

  const [users, setUsers] = useState<CouponResponseType[]>([]);
  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);

  const paramsFiler: ObjectLiteral = {
    offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
    limit: getLimitParam(paramsURL),
    sortBy: paramsURL.sortBy || 'id:desc',
    keyword: paramsURL.keyword,
    voucherCategory: paramsURL?.voucherCategory,
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      const res: ResponseListModel<CouponResponseType> =
        await couponService.get(paramsFiler);

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

  /** * onClick create Go to create page */
  const onClickCreate = () => {
    navigate(ROUTES.COUPON_MANAGEMENT_CREATE);
  };

  return (
    <S.Wrapper>
      <H5>COUPON MANAGEMENT</H5>
      <Form
        form={form}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
        initialValues={{ ...paramsURL }}
      >
        <S.Filter>
          <div className="filter">
            <div className="search">
              <InputSearch
                defaultValue={paramsURL?.keyword}
                placeholder="Search by name..."
              />
            </div>
            <div className="dropdown">
              <Form.Item
                name="voucherCategory"
                style={{ marginBottom: 0, width: 160 }}
              >
                <Select
                  allowClear
                  placeholder="Category coupon"
                  options={Object.entries(VoucherCategoryLabel).map(
                    ([value, label]) => ({
                      label,
                      value,
                    })
                  )}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <PrimaryButton onClick={onClickCreate} icon={<Add />}>
              Create
            </PrimaryButton>
          </div>
        </S.Filter>
      </Form>

      <div className="table">
        <CouponManagementTable
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

export default CouponManagement;
