import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import { PaginationChangeType } from '@components/common/Pagination';
import Tabs from '@components/faqManagement/Tabs';
import { EVENT_TYPE } from '@constants/codeConstants';
import navigationService from '@services/navigationService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { getOffset } from '@utils/table';
import { ModalProps, message } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import { PaginateType, initFilter } from 'interface/general';
import { EventDetail } from 'interface/navigation';
import { useEffect, useState } from 'react';
import * as S from './style';
import TableModalSelectEvent from '../TableModalSelectEvent';

type ModalSelectEventsProps = ModalProps & {
  open: boolean;
  navigationId: number;
  onCancel: () => void;
};
export type UpdateEvent = {
  id: number;
  belongNavCateId: boolean;
};

const ModalSelectEvents = ({
  open,
  navigationId,
  onCancel,
}: ModalSelectEventsProps) => {
  const [loading, setLoading] = useState(false);

  const [paginate, setPaginate] = useState<PaginationChangeType>({
    limit: 10,
    page: 1,
  });
  const [paginateTable, setPaginateTable] = useState<PaginateType>({
    ...initFilter,
    ...paginate,
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [tab, setTab] = useState<string>(EVENT_TYPE.CONCERT);
  const [dataTable, setDataTable] = useState<EventDetail[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpdateEvent[]>([]);

  const handleChangePaginate = (value: PaginationChangeType) => {
    setPaginate({
      ...paginate,
      ...value,
    });
  };

  const onChangeTab = (key: string) => {
    setTab(key);
    setPaginate({
      limit: 10,
      page: 0,
    });
    setSelectedEvent([]);
  };

  /** * Load list event */
  const fetchListEvent = async () => {
    setLoading(true);
    try {
      const requestParams = {
        eventType: tab,
        keyword: inputValue,
        belongToNavCateIdCheck: navigationId,
        ...paginate,
      };
      const res = await navigationService.getListEventDetail({
        ...requestParams,
        offset: getOffset(paginate.page, paginate.limit),
      });
      const convertData = res?.data?.data?.map((item) => ({
        key: item.id,
        ...item,
      }));
      const selectedIds = convertData
        .filter((data) => data.belongNavCateId)
        .map((item) => item.id);

      setSelectedRowKeys(selectedIds);

      setDataTable(convertData);
      setPaginateTable({
        ...paginateTable,
        ...paginate,
        length: res?.data?.length,
      });
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListEvent();
  }, [inputValue, tab, JSON.stringify(paginate)]);

  const handleCancel = () => {
    setPaginate({
      limit: 10,
      page: 0,
    });
    onCancel();
  };

  const updateNavigationList = async () => {
    try {
      const requestParams = {
        id: navigationId,
        events: selectedEvent,
      };
      const res = await navigationService.update(requestParams);
      message.success(res.message);
      handleCancel();
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  return (
    <Modal isOpen={open} onCancel={handleCancel} hiddenIcon={false} width="80%">
      <S.ModalContent>
        <H5>NAVIGATION SET UP</H5>
        <Input
          allowClear
          placeholder="Event, artist, concert, sport..."
          prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Tabs
          onChange={onChangeTab}
          items={[
            { label: 'Concert', key: EVENT_TYPE.CONCERT },
            { label: 'Sport', key: EVENT_TYPE.SPORT },
            { label: 'Art Gallery', key: EVENT_TYPE.ART_GALLERY },
            { label: 'Other', key: EVENT_TYPE.OTHER },
          ]}
        />

        <TableModalSelectEvent
          hasPushParams={false}
          loading={loading}
          resources={dataTable}
          paginate={paginateTable}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setSelectedEvent={setSelectedEvent}
          onChangePaginate={handleChangePaginate}
        />
        {selectedEvent.length > 0 && (
          <div className="btn-Change">
            <Button
              maxwidth="161"
              bgcolor={theme.colors.primarySolid500}
              color="#000"
              onClick={updateNavigationList}
            >
              Change
            </Button>
          </div>
        )}
      </S.ModalContent>
    </Modal>
  );
};

export default ModalSelectEvents;
