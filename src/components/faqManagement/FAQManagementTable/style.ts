import styled from 'styled-components';

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
