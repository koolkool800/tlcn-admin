import { styled } from 'styled-components';

export const Wrapper = styled.div<{ isShown?: boolean }>`
  width: 100%;
  height: 500px;
  display: ${(props) => (props.isShown ? `block` : `none`)};
  background-color: ${(props) => props.theme.colors.primarySolid950};
  overflow: auto;
  margin: 10px 0;
  padding: 20px;
  border-radius: 10px;

  .container-header-box {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${(props) => props.theme.colors.emphasisLightColorMedium};
    .title-box-classes {
      color: ${(props) => props.theme.colors.solidBrightGreenNetrual};
    }
    span {
      font-weight: 700;
    }
    .container-switch-custom {
      display: flex;
      gap: 10px;
      .ant-form-item {
        margin-bottom: unset;
      }
    }
  }
  .container-zone {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
    overflow-x: auto;
    /* width */
    &::-webkit-scrollbar {
      width: 1px;
      background-color: transparent;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border: 4px solid transparent;
      border-radius: 8px;
      background-clip: padding-box;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 8px;
    }
    span {
      color: ${(props) => props.theme.colors.white};
    }
  }
  .container-floor {
  }
`;
