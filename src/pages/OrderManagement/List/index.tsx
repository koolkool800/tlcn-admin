import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import Select from '@components/common/Select';
import OrderManagementTable from '@components/orderManagement/Table';
import { EventTypeLabel, OrderStatusLabel } from '@constants/codeConstants';
import orderService from '@services/orderService';
import { H5 } from '@style/DefaultStyled';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { ResponseListModel, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { FilterOrderResponseType, OrderResponseType } from 'interface/order';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const OrderManagement = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const paramsURL: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });

  const [users, setUsers] = useState<OrderResponseType[]>([]);
  const [filterData, setFilterData] = useState<FilterOrderResponseType>({});
  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const filterParams: ObjectLiteral = {
        offset: getOffset(paramsURL.page || 1, paramsURL?.limit || 10) || 0,
        limit: paramsURL.limit || 10,
        searchText: paramsURL?.searchText,
        status: paramsURL?.status || null,
        date: paramsURL?.date || null,
        performer: paramsURL?.performer || null,
        place: paramsURL?.place || null,
        eventType: paramsURL?.eventType || null,
      };

      const res: ResponseListModel<OrderResponseType> = await orderService.get(
        filterParams
      );

      setUsers(res?.data?.data || []);

      setTotalElement(res?.data?.length || 0);
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  const fetchFilter = async () => {
    setLoading(true);
    try {
      const res: ResponseModel<FilterOrderResponseType> =
        await orderService.getFilter();

      setFilterData(res?.data || {});
    } catch (error) {
      /* empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  /** *
   * handle on change pagination
   */
  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };

  const onChangeValue = (values: ObjectLiteral) => {
    pushParams(navigate, location, { ...values, page: 1 });
  };

  useEffect(() => {
    fetchOrder();
  }, [location.search]);

  return (
    <S.Wrapper>
      <H5>ORDER MANAGEMENT</H5>
      <Form
        form={form}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
        initialValues={{
          searchText: paramsURL?.searchText,
          status: paramsURL?.status || null,
          date: paramsURL?.date ? dayjs(paramsURL?.date) : null,
          performer: paramsURL?.performer || null,
          place: paramsURL?.place || null,
          eventType: paramsURL?.eventType || null,
        }}
      >
        <S.Filter>
          <div className="filter">
            <div className="search">
              <InputSearch
                name="searchText"
                defaultValue={paramsURL?.searchText}
                placeholder="Search by name..."
              />
            </div>
            <div className="dropdown filter-status">
              <Form.Item
                name="status"
                style={{ marginBottom: 0, width: '100%' }}
              >
                <Select
                  allowClear
                  placeholder="Status"
                  options={Object.entries(OrderStatusLabel).map(
                    ([value, label]) => ({
                      label,
                      value,
                    })
                  )}
                />
              </Form.Item>
            </div>
            <div className="dropdown">
              <DatePickerCustom name="date" mb="0" />
            </div>
            <div className="dropdown">
              <Form.Item
                name="performer"
                style={{ marginBottom: 0, width: '100%' }}
              >
                <Select
                  allowClear
                  placeholder="Performer"
                  options={filterData?.performers?.map((item: string) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="dropdown">
              <Form.Item
                name="place"
                style={{ marginBottom: 0, width: '100%' }}
              >
                <Select
                  allowClear
                  placeholder="Places"
                  options={filterData?.places?.map((item: string) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </div>
            <div className="dropdown">
              <Form.Item
                name="eventType"
                style={{ marginBottom: 0, width: '100%' }}
              >
                <Select
                  allowClear
                  placeholder="Event"
                  options={Object.entries(EventTypeLabel).map(
                    ([value, label]) => ({
                      label,
                      value,
                    })
                  )}
                />
              </Form.Item>
            </div>
          </div>
        </S.Filter>
      </Form>

      <div className="table">
        <OrderManagementTable
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

export default OrderManagement;
