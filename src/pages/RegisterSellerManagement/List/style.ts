import Button from '@components/common/Button';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  h5 {
    text-align: left;
  }

  .filter {
    width: 100%;

    display: block;
    align-items: center;

    margin-bottom: 16px;
  }

  .search {
    display: inline-flex;
    margin-bottom: 8px;
  }

  .dropdown {
    display: inline-flex;
    min-width: 112px;
    margin-left: 8px;
    margin-bottom: 8px;
    .ant-form-item {
      width: 100%;
    }
  }
`;

const Filter = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExportButton = styled(Button)`
  height: auto;

  background-color: ${(props) => props.theme.colors.primarySolid500};
  span {
    color: ${(props) => props.theme.colors.emphasisDarkColorMedium};
  }

  img {
    width: 24px;
  }

  margin-bottom: 16px;
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
const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  .approve {
    color: ${(props) => props.theme.colors.solidBasicBlue400};
    cursor: pointer;
  }

  svg {
    cursor: pointer;
  }
`;
export { Wrapper, Filter, ExportButton, ModalContent, Action };
