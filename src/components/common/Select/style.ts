import { Select } from 'antd';
import { styled } from 'styled-components';

type PropsSelect = {
  width?: number | string | undefined;
};

export const Option = styled(Select.Option)``;
export const OptGroup = styled(Select.OptGroup)``;
export const AntSelect = styled(Select)<PropsSelect>`
  &.ant-select {
    width: ${(props) => `${props.width ? `${props.width}px` : '100%'}`};
    height: 40px;
    display: inline-flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.surfaceMedium} !important;
    gap: 7px;
    font-size: 15px;
    line-height: 20px;
    border-radius: 14px;
    font-family: ${(props) => props.theme.font.variable};
    color: ${(props) => props.theme.colors.surfaceSmall};
    background-color: ${(props) => props.theme.colors.surfaceDark};
    .ant-select-arrow {
      color: ${(props) => props.theme.colors.surfaceHight};
    }
    .ant-select-clear {
      width: initial;
      height: initial;
      color: ${(props) => props.theme.colors.surfaceHight};
      margin-top: -10px;
      background-color: ${(props) => props.theme.colors.neutral20};
    }
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
    color: ${(props) => props.theme.colors.surfaceSmall};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 15px;
    line-height: 20px;
    padding: 0;
    transition: none;
    border: unset;
    width: inherit;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding-left: 10px;
  }

  &.ant-select-single.ant-select-open .ant-select-selection-item {
    color: inherit;
    border: unset;
    border-color: unset;
  }

  &.ant-select-multiple .ant-select-selection-item {
    background-color: rgba(83, 246, 198, 0.1) !important;
  }
  &.ant-select .ant-select-selection-placeholder,
  &.ant-select-multiple .ant-select-selection-placeholder {
    color: ${(props) => props.theme.colors.surfaceSmall};
  }
  &.ant-select-focused.ant-select:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    border: unset;
    border-color: unset;
    box-shadow: none;
  }
`;
