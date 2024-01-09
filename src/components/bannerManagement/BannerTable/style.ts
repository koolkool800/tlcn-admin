import { styled } from 'styled-components';

export const TableActions = styled.div`
  display: flex;
  gap: 12px;
  .action {
    text-transform: capitalize;
    cursor: pointer;
    color: ${(props) => props.theme.colors.solidBasicBlue400};
  }
`;

export const WrapperModalDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h5,
  .desc {
    color: ${(props) => props.theme.colors.surfaceHight};
  }

  .desc {
    font-size: 1.5rem;
  }

  .action {
    display: flex;
    gap: 20px;
  }
`;

export const Wrapper = styled.div`
  .three-dot {
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
`;
