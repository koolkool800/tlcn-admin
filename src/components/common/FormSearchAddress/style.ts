import { styled } from 'styled-components';

export const Label = styled.div`
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
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;
`;

export const WrapperDaumCode = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  border: 1px solid;

  .icon {
    color: #ffffff;
    position: absolute;
    right: -1px;
    top: -26px;
    padding: 1px 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .ti {
      margin-top: 3px;
      font-weight: 600;
    }
  }
`;
