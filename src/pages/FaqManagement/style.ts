import { styled } from 'styled-components';

export const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h5 {
    text-align: left;
  }
  .action-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input-search-wrap {
    }
    .btn-create {
      width: fit-content;
    }
  }

  .action-faq {
    display: flex;
    gap: 12px;
    .text {
      color: ${(props) => props.theme.colors.solidBasicBlue400};
      cursor: pointer;
    }
  }
`;
