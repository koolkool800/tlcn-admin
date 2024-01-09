import DatePickerCustom from '@components/common/Datepicker';
import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import Select from '@components/common/Select';
import EventManagementTable from '@components/eventManagement/Table';
import { EventStatusLabel, EventTypeLabel } from '@constants/codeConstants';
import eventService from '@services/eventService';
import { H5 } from '@style/DefaultStyled';
import { capitalize, pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { ListEventType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const EventManagement = () => {
  const [form] = Form.useForm();

  /** ********************* manage router ************************************ */
  const navigate = useNavigate();
  const location = useLocation();
  const paramsURL: ObjectLiteral = queryString.parse(location.search, {
    arrayFormat: 'comma',
    parseBooleans: true,
  });

  const paramFilterObject = {
    offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)) || 0,
    limit: getLimitParam(paramsURL),
    sortBy: paramsURL.sortBy,
    q: paramsURL.q,
    performers: paramsURL?.performers,
    places: paramsURL?.places,
    eventTypes: paramsURL?.eventTypes,
    status: paramsURL?.status,
    performanceTime: paramsURL?.performanceTime || null,
  };

  /** ********************* manage state ************************************ */
  const [events, setEvents] = useState<ListEventType[]>([]);
  const [filters, setFilters] = useState<{ field: string; data: string[] }[]>(
    []
  );
  const [totalElement, setTotalElement] = useState(0);

  const [loading, setLoading] = useState(false);

  /** ********************* Fetch data ***************************************** */
  const fetchEvent = async () => {
    setLoading(true);
    try {
      const res = await eventService.get(paramFilterObject);
      setEvents(res?.data?.data || []);

      setTotalElement(res?.data?.length || 0);
    } catch (err) {
      /* empty */
    }

    setLoading(false);
  };

  const fetchFilter = async () => {
    try {
      const res = await eventService.getFilter();
      setFilters(res?.data || []);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  useEffect(() => {
    fetchEvent();
  }, [location.search]);

  /** ********************* Handle filter table ************************************ */

  const onChangeValue = (values: ObjectLiteral) => {
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

  /** ********************* Render ************************************ */
  return (
    <S.Wrapper>
      <H5>EVENT MANAGEMENT</H5>
      <Form
        form={form}
        onValuesChange={onChangeValue}
        onFinish={onChangeValue}
        initialValues={{
          ...paramFilterObject,
          performanceTime: paramFilterObject?.performanceTime
            ? dayjs(paramFilterObject?.performanceTime)
            : null,
        }}
      >
        <div className="filter">
          <div className="search">
            <InputSearch
              defaultValue={paramFilterObject?.q}
              name="q"
              placeholder="Search by name..."
            />
          </div>
          <div className="dropdown">
            <Form.Item name="status" style={{ marginBottom: 0 }}>
              <Select
                allowClear
                placeholder="Status"
                options={Object.entries(EventStatusLabel).map(
                  ([value, label]) => ({
                    label,
                    value,
                  })
                )}
              />
            </Form.Item>
          </div>

          {filters?.map((item: { field: string; data: string[] }) => (
            <div className="dropdown" key={item.field}>
              <Form.Item
                name={item.field}
                style={{ marginBottom: 0, width: 120 }}
              >
                <Select
                  allowClear
                  placeholder={capitalize(item.field)}
                  options={item?.data?.map((data: string) => ({
                    label: data,
                    value: data,
                  }))}
                />
              </Form.Item>
            </div>
          ))}

          <div className="dropdown">
            <Form.Item
              name="performanceTime"
              style={{ marginBottom: 0, width: 120 }}
            >
              <DatePickerCustom
                mb="0"
                placeholder="Time"
                name="performanceTime"
              />
            </Form.Item>
          </div>

          <div className="dropdown">
            <Form.Item
              name="eventTypes"
              style={{ marginBottom: 0, width: 120 }}
            >
              <Select
                allowClear
                placeholder="Event type"
                options={Object.entries(EventTypeLabel).map(
                  ([value, label]) => ({ label, value })
                )}
              />
            </Form.Item>
          </div>
        </div>
      </Form>

      <div className="table">
        <EventManagementTable
          loading={loading}
          resources={events}
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

export default EventManagement;
