import { FaqStatus } from 'interface';
import { styled } from 'styled-components';

export const Status = styled.div<{ type: string }>`
  border-radius: 16px;
  display: inline-flex;
  padding: 2px 8px 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 6px;

  width: auto;
  white-space: nowrap;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${(props) => {
      switch (props.type) {
        case 'PAYMENT_PENDING':
          return '#CDB4DB';
        case 'PENDING':
        case 'pending':
          return '#D8A800';
        case 'listTing':
          return '#FA00FF';
        case 'error':
          return '#FF0000';
        case 'success':
        case 'approved':
          return '#00ADC5';
        case FaqStatus.ACTIVE:
          return props.theme.colors.acTiveStatusDotColor;
        case FaqStatus.INACTIVE:
          return '#9C9898';
        case 'ENDED':
          return '#FF0000';
        case 'CANCEL':
        case 'rejected':
          return '#FF6B00';
        case 'PAYMENT_COMPLETED':
          return '#0066FF';
        case 'SENT_PIN':
          return '#FFAFCC ';
        case 'SENT_DELIVERY_UNIT':
          return '#BDE0FE';
        case 'DELIVERY_UNIT_RECEIVED':
          return '#0066FF';
        case 'DELIVERY_COMPLETED':
          return '#0066FF';
        case 'TRANSACTION_COMPLETED':
          return '#7A00C5';
        case 'DELIVERY_UNIT_COMPLETED_CHECKING':
          return '#D4A373';
        default:
          return '';
      }
    }};
  }

  background-color: ${(props) => {
    switch (props.type) {
      case 'PAYMENT_PENDING':
        return 'rgba(205, 180, 219, 0.30)';
      case 'PENDING':
      case 'pending':
        return 'rgba(176, 138, 0, 0.30)';
      case 'listTing':
        return 'rgba(250, 0, 255, 0.30)';
      case 'error':
        return 'rgba(255, 0, 0, 0.30)';
      case 'success':
      case 'approved':
        return 'rgba(0, 173, 197, 0.30)';
      case FaqStatus.ACTIVE:
        return props.theme.colors.activeStatusColor;
      case FaqStatus.INACTIVE:
        return '#5f5f5f';
      case 'ENDED':
        return '#FF00004D';
      case 'CANCEL':
      case 'rejected':
        return 'rgba(255, 107, 0, 0.30)';
      case 'PAYMENT_COMPLETED':
        return 'rgba(0, 102, 255, 0.30)';
      case 'SENT_PIN':
        return 'rgba(255, 175, 204, 0.30)';
      case 'SENT_DELIVERY_UNIT':
        return 'rgba(189, 224, 254, 0.30)';
      case 'DELIVERY_UNIT_RECEIVED':
        return 'rgba(0, 102, 255, 0.30)';
      case 'DELIVERY_COMPLETED':
        return 'rgba(0, 102, 255, 0.30)';
      case 'TRANSACTION_COMPLETED':
        return 'rgba(122, 0, 197, 0.30)';
      case 'DELIVERY_UNIT_COMPLETED_CHECKING':
        return 'rgba(212, 163, 115, 0.30)';

      default:
        return '';
    }
  }};
`;
