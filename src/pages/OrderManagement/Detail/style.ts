import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  h5 {
    text-align: left;
  }

  .filter {
    width: 100%;

    display: flex;
    gap: 60px;

    .search {
      width: 292px;
    }
    .status {
      width: 92px;
    }
  }

  .table {
    margin-top: 16px;
  }
`;

const ActionGroup = styled.div`
  width: '100%';
  display: flex;
  justify-content: center;
  gap: 1rem;

  button {
    width: fit-content;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .desc {
    color: ${(props) => props.theme.colors.emphasisDarkSurfaceHigh};
    font-size: ${(props) => props.theme.fontSizes[3]}px;
  }

  .footer {
    display: flex;
    justify-content: end;
    gap: 1rem;
  }
`;

export { Wrapper, ActionGroup, ModalContent };
