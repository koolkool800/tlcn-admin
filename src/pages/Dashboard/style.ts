import styled from 'styled-components';

export const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  .item {
    .link a {
      color: #53f6c6 !important;
    }

    .link a {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 2px;
      font-size: 12px;
    }

    .item-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      gap: 8px;

      .count {
        font-weight: bold;
        font-size: 1.5rem;
      }

      .desc {
        color: rgba(255, 255, 255, 0.72) !important;
      }
    }

    padding: 8px;
    aspect-ratio: 2/1;
    background-color: rgba(83, 246, 198, 0.1);
    border-radius: 0.5rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }
`;

export const WrapperRevenue = styled.div`
  margin-top: 20px;

  display: grid;
  grid-template-columns: 40% 58%;
  gap: 20px;
  width: 100%;
`;
