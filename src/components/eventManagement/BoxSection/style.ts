import { styled } from 'styled-components';

export const Wrapper = styled.div<{ itemactive: string }>`
  padding: 10px;
  min-width: 50px;
  background-color: ${(props) =>
    props.itemactive === 'true'
      ? props.theme.colors.emphasisDarkSurfaceSmall
      : props.theme.colors.emphasisDarkColorHight};
  text-align: center;
  border-radius: 10px;
  .ant-radio-inner {
    display: none;
  }
`;
