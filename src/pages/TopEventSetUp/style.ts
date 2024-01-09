import { styled } from 'styled-components';

export const TopEventContainer = styled.div`
  h5 {
    text-align: left;
    margin-bottom: 16px;
  }
  .action-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    .btn-wrap {
      display: flex;
      gap: 16px;
      button {
        width: fit-content;
      }
    }
  }
  .top-event-set-up-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    button {
      height: initial;
    }
  }
`;
