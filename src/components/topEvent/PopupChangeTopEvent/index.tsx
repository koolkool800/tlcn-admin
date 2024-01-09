import Button from '@components/common/Button';
import topEventService from '@services/topEventService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { getOffset } from '@utils/table';
import { Modal, ModalProps } from 'antd';
import { RowSelectMethod } from 'antd/es/table/interface';
import { AllTopEventsForSelectResponse } from 'interface';
import { PaginateType, initFilter } from 'interface/general';
import { Key, useEffect, useState } from 'react';
import TableEvent from '../TableEvent';
import * as S from './style';

type Props = ModalProps & {
  onSubmitChangeEvent: (selectedEvent: any) => void;
};

const PopupChangeTopEvent = ({ onSubmitChangeEvent, ...props }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [dataTable, setDataTable] = useState<AllTopEventsForSelectResponse[]>(
    []
  );
  const [paginate, setPaginate] = useState<PaginateType>({
    ...initFilter,
    //   offset: getOffset(paramsURL?.page || 1, paramsURL?.limit || 10),
  });
  const [loading, setLoading] = useState(false);

  const onChangePaginate = (page: number, pageSize: number) => {
    setPaginate((pre) => ({
      ...pre,
      offset: getOffset(page || 1, paginate.limit || 10),
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await topEventService.getEventsForTopEvents({
        offset: paginate.offset,
        limit: paginate.limit,
      });
      setDataTable(res.data.data);
      setPaginate((pre) => ({ ...pre, length: res.data.length }));
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  const onSelectRow = (
    selectedRowKeys: Key[],
    selectedRows: any[],
    info: {
      type: RowSelectMethod;
    }
  ) => {
    setSelectedEvent(selectedRows[0]);
  };

  const handleOnSubmitChange = () => {
    setSelectedEvent(undefined);
    onSubmitChangeEvent(selectedEvent);
  };

  useEffect(() => {
    fetchData();
  }, [paginate.limit, paginate.offset]);
  return (
    <Modal
      {...props}
      width="80%"
      modalRender={(node) => <S.ModalContainer>{node}</S.ModalContainer>}
      footer={
        <Button
          bgcolor={theme.colors.primarySolid500}
          color="#000"
          onClick={handleOnSubmitChange}
          key="submit"
        >
          Change
        </Button>
      }
    >
      <H5> Select 1 event to set top event</H5>
      <TableEvent
        resources={dataTable}
        paginate={paginate}
        loading={loading}
        onChangePaginate={onChangePaginate}
        onRowChange={onSelectRow}
        selectedKeys={[selectedEvent?.eventId]}
      />
    </Modal>
  );
};

export default PopupChangeTopEvent;
