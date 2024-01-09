/* eslint-disable import/no-extraneous-dependencies */
import { Column } from '@ant-design/charts';
import Map from '@components/common/Map';
import BoxClass from '@components/eventManagement/BoxClass';
import BoxInfoEvent from '@components/eventManagement/BoxInfoEvent';
import { ROUTES } from '@constants/routes';
import dayjs from 'dayjs';
import eventService from '@services/eventService';
import { H5, PrimaryButton, Typography } from '@style/DefaultStyled';
import { Form } from 'antd';
import { EventType, TradingVolume } from 'interface/event';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dateTimeFormatWithHour } from '@utils/format';
import * as S from './styles';

function flattenArray(arr: any[]) {
  return arr.reduce((result: any, subArray) => {
    return result.concat(subArray);
  }, []);
}

const convertDataToChart = (data: any) => {
  const newArr: any = [];
  data.forEach((element: any) => {
    newArr.push([
      {
        groupName: element.groupName,
        value: element.numberOfSoldTicketRate,
        type: 'sold',
      },
      {
        groupName: element.groupName,
        value: element.numberOfUnsoldTicketRate,
        type: 'unSold',
      },
    ]);
  });
  return flattenArray(newArr);
};

function DetailEvent() {
  const { id = '' } = useParams();
  const [form] = Form.useForm();
  const [event, setEvent] = useState<EventType>();
  const [chartData, setChartData] = useState<TradingVolume>();
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await eventService.getDetail(id);
    const chartRes = await eventService.getTradingVolume(id);
    setChartData(convertDataToChart(chartRes.data));
    setEvent(data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const config: any = {
    data: chartData,
    isStack: true,
    xField: 'groupName',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'Top',
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle: any, element: HTMLElement) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.25,
        };
      },
    },
  };
  return (
    <S.Wrapper>
      <H5>Event Detail</H5>
      {event && (
        <>
          <div className="container-button">
            <PrimaryButton
              width="500"
              onClick={() =>
                navigate(
                  ROUTES.EVENT_MANAGEMENT_UPDATE.replace(
                    ':id',
                    JSON.stringify(event?.id)
                  )
                )
              }
            >
              Update
            </PrimaryButton>
          </div>
          <BoxInfoEvent
            eventId={event.id}
            eventName={event.title}
            eventCategory={event.eventType}
            performanceDate={dateTimeFormatWithHour(event.performanceDate)}
            place={event.place}
          />
          <div className="container-stadium">
            <Typography>seating map</Typography>
            <Map stadiumMap={event.stageMap} isStatic />
          </div>
          <div className="container-class">
            <Form.Provider>
              <Form form={form}>
                {event.group.map((item: any) => {
                  const dataMap = {
                    groupName: item.name,
                    groupId: item.groupId,
                    sections: item.section.map((i: any) => i.name),
                    isObstructed: item.isObstructed,
                    originalPrice: item.originalPrice,
                    minPrice: item.minPrice,
                    floors: item.section.map((i: any) => ({
                      floors: i.floor,
                      name: i.name,
                    })),
                  };
                  return (
                    <BoxClass
                      key={item.groupName}
                      dataMap={dataMap}
                      isShown
                      selectedSection={item.section.map((i: any) => i.name)[0]}
                      isStatic
                    />
                  );
                })}
              </Form>
            </Form.Provider>

            <div className="container-chart">
              <Column {...config} />
            </div>
          </div>
        </>
      )}
    </S.Wrapper>
  );
}

export default DetailEvent;
