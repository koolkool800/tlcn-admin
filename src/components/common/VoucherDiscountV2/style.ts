import { styled } from 'styled-components';

export const Wrapper = styled.div`
  max-width: 267px;
  max-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px 24px 16px;
  position: relative;
  overflow: hidden;
  .layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid ${(props) => props.theme.colors.white};
  }
  .container-date {
    position: absolute;
    right: 8px;
    top: 4px;
    display: flex;
    justify-content: flex-end;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.15px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  .container-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    h4 {
      line-height: unset;
    }
    span: nth-child(1) {
      leading-trim: both;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: -74.6px;
    }
    span: nth-child(2) {
      color: ${(props) => props.theme.colors.surfaceHight};
      font-size: 14px;
      font-style: normal;
      font-weight: 800;
    }
  }
  .container-footer {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    position: absolute;
    left: -10px;
    top: 50%;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.colors.white};
    z-index: 10;
  }
  &:after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    position: absolute;
    right: -10px;
    top: 50%;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.colors.white};
    z-index: 10;
  }
`;
