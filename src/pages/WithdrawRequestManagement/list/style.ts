import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .filter {
    margin-top: 26px;
    width: 100%;
    display: inline-flex;
    gap: 8px;
  }

  .table {
    margin-top: 16px;
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

export { Wrapper, ModalContent };
