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
    padding: 12px 0;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    margin-top: 8px;

    .filter-item {
      cursor: pointer;
      border: 1px solid rgba(83, 246, 198, 0.1);
      border-radius: 4px;

      line-height: 32px;
      padding: 0 8px;
      height: 32px;
      width: fit-content;
    }

    .active {
      border: 1px solid #53f6c6;
    }

    .filter-range {
      .active {
        border: 1px solid #53f6c6;
        border-radius: 8px;
      }
      .ant-picker {
        border: 1px solid rgba(83, 246, 198, 0.1);
        background-color: transparent;

        .ant-picker-input > input,
        .ant-picker-suffix {
          color: white;
        }
      }
    }
  }
`;
