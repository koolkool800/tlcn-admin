import styled, { css } from 'styled-components';

const dropdownAnimation = css`
  max-height: 0px;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.3s ease;

  &.shown {
    margin-bottom: 0px;
    max-height: max-content;
    opacity: 1;
  }
`;

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  .container-box-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 262px;
    padding: 10px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.colors.surfaceDark} !important;
    color: ${(props) => props.theme.colors.white} !important;
    cursor: pointer;
    path {
      stroke: ${(props) => props.theme.colors.white} !important;
    }
  }
  .container-box-content {
    overflow: hidden;
    margin-bottom: 24px;
    min-height: max-content;

    ${dropdownAnimation}

    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      background-color: ${(props) => props.theme.colors.solidBasicNeutral};
      margin-top: 4px;
      border-radius: 14px;
  }
`;
