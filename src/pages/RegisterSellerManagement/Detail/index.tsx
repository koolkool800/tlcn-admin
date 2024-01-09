import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import EventInformation from '@components/registerSellManagement/EventInformation';
import OrderInformation from '@components/registerSellManagement/OrderInformation';
import SellInformation from '@components/registerSellManagement/SellInformation';
import TicketInformation from '@components/registerSellManagement/TicketInformation';
import { TicketStatusLabel } from '@constants/codeConstants';
import registerToSellService from '@services/registerToSellService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { message } from 'antd';
import { ObjectLiteral } from 'interface/general';
import { RegisterToSellDetailType } from 'interface/registerToSell';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as S from './style';

const Detail = () => {
  /** * Translation ********************************************************************** */
  const { t } = useTranslation();

  /** * Params ********************************************************************** */
  const params: ObjectLiteral = useParams();

  /** * State ********************************************************************** */
  const [model, setModel] = useState<RegisterToSellDetailType | null>(null);
  const [loading, setLoading] = useState(false);
  const [approve, setApprove] = useState<RegisterToSellDetailType | null>(null);

  /** * Fetch data ********************************************************************** */
  const fetchData = async () => {
    try {
      const res = await registerToSellService.getDetail(params?.id);
      setModel(res?.data?.response);
    } catch (err) {
      /* tslint:disable:no-empty */
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  /** * Approve ticket ********************************************************************** */
  const handleApprove = async () => {
    setLoading(true);
    try {
      const resApprove = await registerToSellService.approve(
        String(approve?.registerInformation?.id)
      );
      if (resApprove?.data) {
        message.success('Approve ticket successful');
        setApprove(null);
        fetchData();
      }
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }

    setLoading(false);
  };

  return (
    <>
      <S.Wrapper>
        <H5>REGISTER SELL DETAIL</H5>
        <OrderInformation item={model as RegisterToSellDetailType} />
        <EventInformation item={model as RegisterToSellDetailType} />
        <TicketInformation item={model as RegisterToSellDetailType} />
        <SellInformation item={model as RegisterToSellDetailType} />
        {model?.ticketInformation?.status?.toLocaleLowerCase() ===
          TicketStatusLabel.PENDING.toLocaleLowerCase() && (
          <S.WrapperAction>
            <PrimaryButton
              style={{ width: 'fit-content' }}
              onClick={() => setApprove(model)}
            >
              Approve
            </PrimaryButton>
          </S.WrapperAction>
        )}
        <Modal
          isOpen={approve !== null}
          onCancel={() => setApprove(null)}
          hiddenIcon={false}
        >
          <S.ModalContent>
            <H5>Confirm</H5>
            <div className="desc">Are you sure approve ticket?</div>
            <div className="footer">
              <Button onClick={() => setApprove(null)} loading={loading}>
                Close
              </Button>
              <PrimaryButton loading={loading} onClick={handleApprove}>
                Approve
              </PrimaryButton>
            </div>
          </S.ModalContent>
        </Modal>
      </S.Wrapper>
    </>
  );
};

export default Detail;
