import { createGlobalStyle } from 'styled-components';
import theme from './themes/default';
// import font
// import PretendardBlack from '../assets/fonts/Pretendard-Black.ttf';
// import PretendardBold from '../assets/fonts/Pretendard-Bold.ttf';
// import PretendardExtraBold from '../assets/fonts/Pretendard-ExtraBold.ttf';
// import PretendardExtraLight from '../assets/fonts/Pretendard-ExtraLight.ttf';
// import PretendardLight from '../assets/fonts/Pretendard-Light.ttf';
// import PretendardMedium from '../assets/fonts/Pretendard-Medium.ttf';
// import PretendardRegular from '../assets/fonts/Pretendard-Regular.ttf';
// import PretendardSemiBold from '../assets/fonts/Pretendard-SemiBold.ttf';
// import PretendardThin from '../assets/fonts/Pretendard-Thin.ttf';
import PretendardVariable from '../assets/fonts/Montserrat-Regular.ttf';

const GlobalStyles = createGlobalStyle`
  
  @font-face {
    font-family: 'Pretendard-Variable';
    src: url(${PretendardVariable}) format('truetype');
    font-style: normal;
    font-weight: 400;
  }


  * {
    margin: 0;
    font-family: 'Pretendard-Variable';
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 16px;
  }
  body {
    height: 100%;
    /* background-color: #030F0B; */
    background: #0d1117;
    /* background: #161b22; */

    /* color: ${theme.colors.surfaceHight}; */
    #root {
      @media(max-width : 540px) {
        /* background-color: #030F0B; */
        /* color: ${theme.colors.surfaceHight}; */
      }
    }
  }
  a, button {
    text-decoration: none;
    cursor: pointer;
    border: none;
    outline: none;
  }

  html, body,
  h1, h2, h3, h4, h5, h6,
  a, p, span,
  em, small, strong,
  sub, sup,
  mark, del, ins, strike,
  abbr, dfn,
  blockquote, q, cite,
  code, pre,
  ol, ul, li, dl, dt, dd,
  div, section, article,
  main, aside, nav,
  header, hgroup, footer,
  img, figure, figcaption,
  address, time,
  audio, video,
  canvas, iframe,
  details, summary,
  fieldset, form, label, legend,
  table, caption,
  tbody, tfoot, thead,
  tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  img, video, picture, canvas {
  max-width: 100%;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    /* display: none; */
  }
  overflow-x: hidden;
  overflow-y: auto;
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  //format item label
  .ant-form-item {
    color: ${theme.colors.surfaceHight};
    font-family: ${theme.font.variable};
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 28px;
  }
  .ant-form-vertical .ant-form-item-label, .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label{
    padding-bottom: 6px;
  }
  .ant-form-item .ant-form-item-label >label {
    color: ${theme.colors.surfaceHight};
    font-family: ${theme.font.variable};
    font-size: 15px;
    line-height: 20px;
    padding: 0;
  }
  // move the required icon to the end of form ant design
  .ant-form-vertical .ant-form-item-label >label::after {
    visibility: initial;
  }
  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: none !important;
  }
  .ant-form-item-label
    > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    content: '*';
    display: inline-block;
    margin-left: 4px;
    color: ${theme.colors.red500};
    font-size: inherit;
    font-family: inherit;
  }

  /* style list select */
  .ant-select-dropdown {
    background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 15px;
    line-height: 20px;
  }
  .ant-select-dropdown .ant-select-item {
    color: ${(props) => props.theme.colors.surfaceHight};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 15px;
    line-height: 20px;
  }
  .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: ${(props) => props.theme.colors.surfaceDark};
    color: ${(props) => props.theme.colors.surfaceHight};
}
`;

export default GlobalStyles;
