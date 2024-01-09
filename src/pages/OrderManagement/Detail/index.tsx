import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import BuyerInformation from '@components/orderManagement/BuyerInformation';
import DeliveryInformation from '@components/orderManagement/DeliveryInformation';
import EventInformation from '@components/orderManagement/EventInformation';
import OrderInformation from '@components/orderManagement/OrderInformation';
import SellerInformation from '@components/orderManagement/SellerInformation';
import orderService from '@services/orderService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { EventType } from 'interface/event';
import { ObjectLiteral } from 'interface/general';
import { OrderBaseCategoryType, OrderResponseType } from 'interface/order';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';

const OrderManagementDetail = () => {
  const params: ObjectLiteral = useParams();
  const [formCompleted] = Form.useForm();
  const [order, setOrder] = useState<OrderResponseType | null>(null);
  const [receivedModal, setReceivedModal] = useState<boolean>(false);
  const [completeChecking, setCompleteChecking] = useState(false);
  const [sendDelivery, setSendDelivery] = useState(false);
  const [loading, setLoading] = useState(false);

  /** * Fetch user detail */
  const fetchData = async () => {
    try {
      const res = await orderService.getDetail(String(params?.id));
      setOrder(res?.data || null);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  const handleReceived = async () => {
    setLoading(true);
    try {
      const res = await orderService.received(String(order?.id), {
        orderStatus: 'DELIVERY_UNIT_RECEIVED',
      });
      message.success('Received ticket successful');
      fetchData();
    } catch (error: any) {
      message.error(error?.message);
    }
    setLoading(false);
    setReceivedModal(false);
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const res = await orderService.received(String(order?.id), {
        orderStatus: 'DELIVERY_UNIT_COMPLETED_CHECKING',
      });
      message.success('Completed checking successful');
      formCompleted.setFieldsValue({});
      fetchData();
    } catch (error: any) {
      message.error(error?.message);
    }
    setLoading(false);
    setCompleteChecking(false);
  };

  const handleSendDeliveryUnit = async (values: ObjectLiteral) => {
    setLoading(true);
    try {
      const res = await orderService.received(String(order?.id), {
        ...values,
        orderStatus: 'DELIVERY_COMPLETED',
      });
      message.success('Send delivery unit successful');
      formCompleted.setFieldsValue({});
      fetchData();
      setSendDelivery(false);
    } catch (error: any) {
      message.error(error?.message);
    }
    setLoading(false);
    setSendDelivery(false);
  };

  return (
    <S.Wrapper>
      <H5>ORDER DETAIL</H5>
      <OrderInformation item={order as OrderResponseType} />
      <DeliveryInformation item={order as OrderResponseType} />
      <EventInformation item={order?.event as EventType} />
      <SellerInformation item={order?.seller as OrderBaseCategoryType} />
      <BuyerInformation item={order as OrderResponseType} />

      <S.ActionGroup>
        {order?.deliveryMethod === 'SELLER_SHIPMENT' && (
          <>
            {order?.status?.toLowerCase() ===
              'SENT_DELIVERY_UNIT'.toLowerCase() && (
              <PrimaryButton
                loading={loading}
                onClick={() => setReceivedModal(true)}
              >
                Received Ticket
              </PrimaryButton>
            )}

            {order?.status?.toLowerCase() ===
              'DELIVERY_UNIT_RECEIVED'.toLowerCase() && (
              <PrimaryButton
                loading={loading}
                onClick={() => setCompleteChecking(true)}
              >
                Completed Checking
              </PrimaryButton>
            )}
            {order?.status?.toLowerCase() ===
              'DELIVERY_UNIT_COMPLETED_CHECKING'.toLowerCase() && (
              <PrimaryButton
                loading={loading}
                onClick={() => setSendDelivery(true)}
              >
                Enter delivery info
              </PrimaryButton>
            )}
          </>
        )}
      </S.ActionGroup>

      {/* Modal received */}
      <Modal
        isOpen={receivedModal}
        onCancel={() => setReceivedModal(false)}
        hiddenIcon={false}
      >
        <S.ModalContent>
          <H5>Confirm</H5>
          <div className="desc">
            Are you sure the customer has received the ticket?
          </div>
          <div className="footer">
            <Button onClick={() => setReceivedModal(false)} loading={loading}>
              Close
            </Button>
            <PrimaryButton loading={loading} onClick={handleReceived}>
              Received
            </PrimaryButton>
          </div>
        </S.ModalContent>
      </Modal>

      {/* Modal complete checking */}
      <Modal
        isOpen={completeChecking}
        onCancel={() => setCompleteChecking(false)}
        hiddenIcon={false}
      >
        <S.ModalContent>
          <H5>Confirm</H5>
          <div className="desc">Are you sure completed checking?</div>
          <div className="footer">
            <Button
              onClick={() => setCompleteChecking(false)}
              loading={loading}
            >
              Close
            </Button>
            <PrimaryButton loading={loading} onClick={handleComplete}>
              Complete checking
            </PrimaryButton>
          </div>
        </S.ModalContent>
      </Modal>

      {/* Modal send delivery info */}
      <Modal
        isOpen={sendDelivery}
        onCancel={() => setSendDelivery(false)}
        hiddenIcon={false}
      >
        <Form
          form={formCompleted}
          layout="vertical"
          onFinish={handleSendDeliveryUnit}
        >
          <S.ModalContent>
            <H5>Confirm</H5>
            <div className="desc">
              <Form.Item name="unitName" label="Unit">
                <Input placeholder="Enter unit name" />
              </Form.Item>
              <Form.Item name="deliveryCode" label="Delivery code">
                <Input placeholder="Enter delivery code" />
              </Form.Item>
            </div>
            <div className="footer">
              <Button onClick={() => setSendDelivery(false)} loading={loading}>
                Close
              </Button>
              <PrimaryButton loading={loading} htmlType="submit">
                Send
              </PrimaryButton>
            </div>
          </S.ModalContent>
        </Form>
      </Modal>
    </S.Wrapper>
  );
};

export default OrderManagementDetail;
