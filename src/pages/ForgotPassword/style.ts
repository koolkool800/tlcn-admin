import { styled } from 'styled-components';
import Button from '@components/common/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 154px;
  margin-bottom: 100px;
  white-space: pre-line;
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  h3 {
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
`;
export const BtnOTP = styled(Button)`
  max-width: 100px;
  padding: 10px 8px;
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.font.variable};
  text-align: center;
  font-size: 15px;
  line-height: 20px;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  white-space: nowrap;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.white} !important;
    opacity: 1 !important;
    color: ${(props) => props.theme.colors.black} !important;
  }

  &.ant-btn-default:disabled {
    opacity: 0.4 !important;
    background-color: ${(props) => props.theme.colors.white} !important;
    color: ${(props) => props.theme.colors.black} !important;
  }
`;
export const Password = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-bottom: 6px;
  .label {
    color: rgba(255, 255, 255, 0.88);
    font-size: 15px;
    font-family: ${(props) => props.theme.font.variable};
    line-height: 20px;
    &:after {
      content: '*';
      display: inline-block;
      margin-left: 4px;
      font-size: inherit;
      font-family: inherit;
      color: ${(props) => props.theme.colors.red500};
    }
  }
  .description {
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceMedium};
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
  }
`;
