import styled from 'styled-components';

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  .approve {
    color: ${(props) => props.theme.colors.solidBasicBlue400};
    cursor: pointer;
  }

  .action-view {
    line-height: 10px;
    color: ${(props) => props.theme.colors.white};
  }
  svg {
    cursor: pointer;
  }
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
        case 'REJECTED':
          return '#FA00FF';
        case 'APPROVED':
          return '#FF6B00';

        default:
          return '';
      }
    }};
  }

  background-color: ${(props) => {
    switch (props.type) {
      case 'PENDING':
        return '#D8A800';
      case 'REJECTED':
        return '#FA00FF';
      case 'APPROVED':
        return '#FF6B00';
      default:
        return '';
    }
  }};
`;

export { Action, Status };
