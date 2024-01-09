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
        case 'ACTIVE':
          return '#04C000';
        case 'ENDED':
          return '#D8A800';

        default:
          return '';
      }
    }};
  }

  background-color: ${(props) => {
    switch (props.type) {
      case 'ACTIVE':
        return 'rgba(4, 192, 0, 0.30)';
      case 'ENDED':
        return 'rgba(176, 138, 0, 0.30)';
      default:
        return '';
    }
  }};
`;

export { Header, Total, Status };
