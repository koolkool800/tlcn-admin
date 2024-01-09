import Button from '@components/common/Button';
import { styled } from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;
`;

const ButtonCreate = styled(Button)`
  width: auto;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.surfaceMedium};
  color: ${(props) => props.theme.colors.primarySolid500};
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background-color: transparent;

  &.ant-btn-default:not(:disabled):hover {
    opacity: 0.4;
    border: 1px solid ${(props) => props.theme.colors.surfaceMedium};
    color: ${(props) => props.theme.colors.primarySolid500};
    transition: opacity ease-out 0.2s;
  }
`;

const ConditionWrapper = styled.div`
  margin-top: 16px;
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(67, 230, 181, 0.4) 0%,
    rgba(7, 106, 106, 0.4) 100%
  );
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  .delete {
    cursor: pointer;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const WrapperFooter = styled.div`
  display: flex;
  justify-content: center;

  button {
    width: fit-content;
  }
`;

export { ConditionWrapper, ButtonCreate, HeaderWrapper, WrapperFooter };
