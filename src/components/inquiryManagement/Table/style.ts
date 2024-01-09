import { InquiryStatusLabel } from '@constants/codeConstants';
import { styled } from 'styled-components';

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

const Action = styled.div`
  width: 80;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    cursor: pointer;
  }

  .action {
    color: #3399ff;
    cursor: pointer;
  }
`;

const Status = styled.div<{ status: keyof typeof InquiryStatusLabel }>`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-transform: capitalize;
  width: fit-content;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 16px;
  background-color: ${(props) => {
    switch (props.status) {
      case 'PENDING':
        return '#b08a00';
      case 'REPLIED':
        return 'rgba(0, 173, 197, 0.3)';
      default:
        return '';
    }
  }};
  padding: 2px 8px 2px 6px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: ${(props) => {
      switch (props.status) {
        case 'PENDING':
          return '#d8a800';
        case 'REPLIED':
          return '#00ADC5';
        default:
          return '';
      }
    }};
  }
`;
export { Header, Total, Action, Status };
