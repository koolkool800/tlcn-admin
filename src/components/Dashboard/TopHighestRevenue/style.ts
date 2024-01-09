import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(83, 246, 198, 0.1);
  border-radius: 0.5rem;
  padding: 12px;

  h5 {
    text-align: left;
  }

  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 8px;

    .count-item {
      font-weight: bold;
      border-radius: 100%;
      width: 1.75rem;
      height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1/1;
      padding: 4px;
    }

    .link {
      /* text-decoration: underline; */
      /* cursor: pointer; */
      color: #53f6c6 !important;

      max-width: 200px;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }
`;
