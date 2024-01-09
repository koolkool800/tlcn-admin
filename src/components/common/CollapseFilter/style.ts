import { Space, SpaceProps } from 'antd';
import { styled } from 'styled-components';

interface PropsSelect extends SpaceProps {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  textColor?: string;
  margin?: string;
  width?: string | number;
  iconColor?: string;
  padding?: string;
  minWidth?: string | number;
  options?: { direction?: 'horizontal' | 'vertical' };
}
export const Box = styled(Space)<PropsSelect>`
  .ant-collapse {
    display: flex;
    flex-direction: ${({ options }) =>
      options?.direction === 'vertical' ? 'column' : 'row'};
    gap: ${({ options }) => options?.direction !== 'vertical' && '12px'};
  }
  .ant-space-item {
    width: ${(props) => props.width} !important;
    margin: ${(props) => props.margin} !important;
    padding: ${(props) => props.padding} !important;
    min-width: ${(props) => props.minWidth} !important;
    .ant-collapse-header {
      flex-direction: row-reverse;
      .ant-collapse-header-text {
        color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
      }
      .ant-collapse-expand-icon {
        color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
      }
    }
    .ant-checkbox-group {
      flex-direction: column;
      gap: 10px;
      .ant-checkbox-wrapper {
        color: white;
        .ant-checkbox-checked {
          .ant-checkbox-inner {
            background-color: ${(props) => props.theme.colors.primary500};
            color: ${(props) => props.theme.colors.primary500};
            border-color: ${(props) => props.theme.colors.primary500};
          }
        }
      }
    }
  }
`;
