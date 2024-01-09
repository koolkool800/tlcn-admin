import { TableAnt } from '@components/common/DataTable/style';
import { styled } from 'styled-components';

const Table = styled(TableAnt)`
  tbody tr td,
  .ant-table-cell {
    font-size: 14px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  margin-top: 12px;
`;

const Total = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const Status = styled.div<{ type: string }>`
  border-radius: 16px;
  display: inline-flex;
  padding: 2px 8px 2px 6px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${(props) => {
      switch (props.type) {
        case 'PENDING':
          return '#D8A800';
        case 'IS_LISTING':
          return '#FA00FF';
        case 'CANCEL':
          return '#FF6B00';
        case 'EXPIRED':
          return '#FF3D00';
        case 'error':
          return '#FF0000';
        case 'PAYMENT_COMPLETED':
          return '#0066FF';
        case 'TRANSACTION_COMPLETED':
          return '#7A00C5';
        case 'HOLD':
          return '#FFFFFF';
        default:
          return '';
      }
    }};
  }

  background-color: ${(props) => {
    switch (props.type) {
      case 'PENDING':
        return 'rgba(176, 138, 0, 0.30)';
      case 'IS_LISTING':
        return 'rgba(250, 0, 255, 0.30)';
      case 'CANCEL':
        return 'rgba(255, 107, 0, 0.30)';
      case 'EXPIRED':
        return 'rgba(255, 61, 0, 0.30)';
      case 'error':
        return 'rgba(255, 0, 0, 0.30)';
      case 'PAYMENT_COMPLETED':
        return 'rgba(0, 102, 255, 0.30)';
      case 'TRANSACTION_COMPLETED':
        return 'rgba(122, 0, 197, 0.30)';
      case 'HOLD':
        return '#5F5F5F';
      default:
        return '';
    }
  }};
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  .approve {
    color: ${(props) => props.theme.colors.solidBasicBlue400};
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;

const WrapperImg = styled.div`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 40px;
    height: 40px;
  }
`;

export { Header, Total, Status, Action, Table, WrapperImg };
