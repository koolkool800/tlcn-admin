import { InputNumber } from 'antd';
import { styled } from 'styled-components';

export const InputAnt = styled(InputNumber)`
  height: 40px;
  border-radius: 14px;
  padding: 6px;
  background-color: ${(props) => props.theme.colors.surfaceDark};
  color: ${(props) => props.theme.colors.surfaceSmall};

  border: 1px solid ${(props) => props.theme.colors.surfaceMedium};

  &.ant-input-number {
    width: 100% !important;
  }
  &.ant-input-number:focus,
  &.ant-input-number:hover {
    border: 1px solid ${(props) => props.theme.colors.surfaceMedium};
  }
  .ant-input-number-handler-wrap {
    border-top-right-radius: 13px;
    border-bottom-right-radius: 13px;
  }

  &.ant-input-number .ant-input-number-input {
    background-color: transparent;
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => props.theme.colors.surfaceSmall};
    &::placeholder {
      color: inherit;
    }
  }
  &.ant-input-number-input-wrap:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: transparent;
    border-inline-end-width: 0;
  }
  &.ant-input-number-input-wrap:focus,
  &.ant-input-number-input-wrap {
    box-shadow: unset;
    border-inline-end-width: unset;
  }
  &.ant-input-number-input-wrap .ant-input-prefix {
    margin-inline-end: 7px;
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  &.ant-input-number-input-wrap .ant-input-clear-icon {
    color: ${(props) => props.theme.colors.white};
  }

  /* style input */
  &.ant-input {
    font-family: ${(props) => props.theme.font.variable};
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => props.theme.colors.surfaceSmall};
    &::placeholder {
      color: inherit;
    }
  }
  &.ant-input:focus,
  &.ant-input-focused {
    box-shadow: none;
    border: 1px solid ${(props) => props.theme.colors.surfaceMedium} !important;
  }
  &.ant-input:hover {
    border-color: unset;
  }

  &.ant-input-disabled,
  &.ant-input[disabled] {
    background-color: ${(props) => props.theme.colors.surfaceDark};
  }
`;
