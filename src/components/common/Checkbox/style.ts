import { Checkbox } from 'antd';
import { styled } from 'styled-components';

export const CheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const CheckboxAnt = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceHight};
    font-size: 14px;
    line-height: 22px;
    padding: 6px;
  }

  .ant-checkbox {
    font-family: inherit;
    color: inherit;
    font-size: inherit;
  }
  .ant-checkbox .ant-checkbox-inner {
    width: 16px;
    height: 16px;
    border-radius: 5.6px;
    // background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    border: 1px solid #fff;
    opacity: 0.3199999928474426;
  }
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner,
  .ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    border: 1px solid #fff;
  }
  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-disabled .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary500};
    border-color: ${(props) => props.theme.colors.primary500};
    opacity: 1;
  }
  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary500};
    border-color: ${(props) => props.theme.colors.primary500};
  }
  .ant-checkbox .ant-checkbox-inner:after {
    border-color: #000000;
  }
  .ant-checkbox-checked:after {
    border-radius: 5.6px;
    border: 1px solid ${(props) => props.theme.colors.primary500};
  }

  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled):after {
    border-color: ${(props) => props.theme.colors.primary500};
  }
  &.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner,
  &.ant-checkbox:not(.ant-checkbox-disabled):hover .ant-checkbox-inner {
    border-color: unset;
  }
  .ant-checkbox + span {
    padding-inline-start: 7px;
    padding-inline-end: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.blue300};
  }
`;
