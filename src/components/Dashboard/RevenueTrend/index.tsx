import { Line } from '@ant-design/charts';
import dashboardService from '@services/dashboardService';
import { H5 } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/format';
import { DatePicker, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import * as S from './style';

const { RangePicker } = DatePicker;

const RevenueTrend = () => {
  const [filter, setFilter] = useState<{
    from: null | Dayjs;
    to: null | Dayjs;
  }>({
    from: dayjs().startOf('weeks').add(1, 'days'),
    to: dayjs().endOf('weeks').add(1, 'days'),
  });
  const [resources, setResources] = useState<
    { revenue: number | null; day: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      let filterParams = '';
      if (filter?.from) {
        filterParams = `reportDateRange=from:${filter.from.format(
          'YYYY-MM-DD'
        )},to:${filter.to?.format('YYYY-MM-DD')}`;
      }

      const res = await dashboardService.getRevenueDashboard(filterParams);
      setResources(res?.data || []);
    } catch (err) {
      /* empty */
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const config: any = useMemo(() => {
    return {
      data: resources,
      width: 600,
      height: 400,
      autoFit: false,
      xField: 'day',
      yField: 'revenue',

      point: {
        size: 5,
        shape: 'diamond',
      },
      yAxis: {
        label: {
          formatter: (v: number) => {
            return currencyFormat(v);
          },
        },
      },
      label: {
        formatter: (
          text: { revenue: number | null | string; day: string },
          item: any,
          index: number
        ) => {
          return Number(text.revenue || 0) > 0
            ? currencyFormat(Number(text?.revenue || 0))
            : null;
        },
        style: {
          fill: '#53f6c6',
        },
      },
    };
  }, [resources]);

  return (
    <>
      <S.Wrapper>
        <H5>Revenue trend</H5>
        <div className="filter-group">
          <div
            aria-hidden
            className={`filter-item ${active === 0 ? 'active' : ''}`}
            onClick={() => {
              setFilter({
                from: dayjs().startOf('weeks').add(1, 'days'),
                to: dayjs().endOf('weeks').add(1, 'days'),
              });
              setActive(0);
            }}
            style={{ color: 'white' }}
          >
            This week
          </div>
          <div
            aria-hidden
            className={`filter-item ${active === 1 ? 'active' : ''}`}
            onClick={() => {
              setFilter({
                from: dayjs().startOf('months').add(1, 'days'),
                to: dayjs().endOf('months').add(1, 'days'),
              });
              setActive(1);
            }}
            style={{ color: 'white' }}
          >
            This month
          </div>
          <div className={`filter-range `}>
            <div className={`${active === 2 ? 'active' : ''}`}>
              <RangePicker
                value={[filter.from, filter.to]}
                style={{ width: 230 }}
                allowClear={false}
                onChange={(event: null | (Dayjs | null)[]) => {
                  if (event) {
                    setFilter({
                      from: event[0],
                      to: event[1],
                    });
                  }

                  setActive(2);
                }}
              />
            </div>
          </div>
        </div>

        <Spin spinning={loading}>
          <Line {...config} />
        </Spin>
      </S.Wrapper>
    </>
  );
};

export default RevenueTrend;
