import Button from '@components/common/Button';
import CardTopEvent, {
  CardTopEventProps,
} from '@components/topEvent/CardTopEvent';
import PopupChangeTopEvent from '@components/topEvent/PopupChangeTopEvent';
import topEventService from '@services/topEventService';
import { H5, H6, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Col, Row, message } from 'antd';
import dayjs from 'dayjs';
import { Candle2, Edit2 } from 'iconsax-react';
import { AllTopEventsForSelectResponse, ListTopEventResponse } from 'interface';
import { useEffect, useState } from 'react';
import * as S from './style';

const TopEventSetUp = () => {
  const [selectedEvent, setSelectedEvent] = useState<
    CardTopEventProps & { index: string }
  >();
  const [events, setEvents] = useState<CardTopEventProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopUpTopEventOpen, setIsPopUpTopEventOpen] = useState(false);
  const loadTopEvents = async () => {
    try {
      const eventResponse = await topEventService.getTopEvent();
      setEvents(
        eventResponse.data.map(
          (item: ListTopEventResponse) =>
            ({
              coverImg: item.eventImage,
              performPlace: item.eventPlace,
              title: item.eventTitle,
              totalViews: item.eventView,
              id: item.eventId,
            } as CardTopEventProps)
        )
      );
    } catch (error) {
      /** error */
    }
  };

  const handleEdit = async () => {
    // update config top event here
    if (new Set(events.map((event) => event.id)).size !== events.length) {
      message.error('Do not set duplicate events');
      return;
    }
    try {
      const responseConfig = await topEventService.configTopEvent({
        data: events.map((item, index) => ({
          eventId: item.id,
          pinOrder: index,
        })),
      });
      message.success(responseConfig.message);
      setIsEditing(false);
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleCancelEdit = async () => {
    // cancel edit config top event

    loadTopEvents();
    setIsEditing(false);
  };

  const handleOKPopUp = () => {
    setIsPopUpTopEventOpen(false);
  };

  const handleCancelPopupCancel = () => {
    setIsPopUpTopEventOpen(false);
  };

  const onSubmitPopupChangeEvent = (
    eventFromModal: AllTopEventsForSelectResponse
  ) => {
    setEvents((pre) =>
      pre.map((item, position) =>
        String(position) === selectedEvent?.index
          ? {
              coverImg: eventFromModal.eventThumbnail,
              id: eventFromModal.eventId,
              performPlace: eventFromModal.eventPlace,
              title: eventFromModal.eventName,
              totalViews: eventFromModal?.eventView,
            }
          : item
      )
    );
    setIsPopUpTopEventOpen(false);
  };
  const startEditTopEvent = async (index: string, event: CardTopEventProps) => {
    setSelectedEvent({ ...event, index });
    setIsPopUpTopEventOpen(true);
  };

  const renderEvents = () => {
    return events.map((event, i) => (
      <div key={dayjs(i).millisecond(i).toISOString()}>
        <CardTopEvent
          id={event.id}
          performPlace={event.performPlace}
          title={event.title}
          totalViews={event.totalViews}
          coverImg={event.coverImg}
        />
        {isEditing && (
          <Button
            bgcolor={theme.colors.primarySolid500}
            color="#000"
            icon={<Candle2 size="20" color="#000" />}
            maxwidth="fit-content"
            onClick={() => startEditTopEvent(String(i), event)}
          >
            Change
          </Button>
        )}
      </div>
    ));
  };

  useEffect(() => {
    loadTopEvents();
  }, []);

  return (
    <S.TopEventContainer>
      <H5>TOP EVENT </H5>
      <div className="action-wrap">
        <div className="text-wrap">
          <H6>Current top event</H6>
          <Typography>(Default set up by view)</Typography>
        </div>
        <div className="btn-wrap">
          {!isEditing && (
            <Button
              bgcolor={theme.colors.primarySolid500}
              color="#000"
              icon={<Edit2 size="20" color="#000" />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          {isEditing && (
            <>
              <Button
                bgcolor={theme.colors.primarySolid500}
                color="#000"
                icon={<Edit2 size="20" color="#000" />}
                onClick={handleEdit}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button
                bgcolor={theme.colors.bgSurface}
                color="#fff"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="top-event-set-up-container">{renderEvents()}</div>
      <PopupChangeTopEvent
        onOk={handleOKPopUp}
        onCancel={handleCancelPopupCancel}
        open={isPopUpTopEventOpen}
        onSubmitChangeEvent={onSubmitPopupChangeEvent}
      />
    </S.TopEventContainer>
  );
};

export default TopEventSetUp;
