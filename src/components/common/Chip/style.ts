import { Tag } from 'antd';
import styled from 'styled-components';

interface PropsTag {
  bgcolor?: string;
  color?: string;
  padding?: string;
}

export const TagAnt = styled(Tag)<PropsTag>`
  padding: 8px;
  border-radius: 11.2px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.colors.surfaceDark};
  color: ${(props) => props.theme.colors.surfaceHight};
  font-family: ${(props) => props.theme.font.variable};
  font-size: 12px;
  line-height: 16px;
  border: none;
  user-select: none;
  &.ant-tag .ant-tag-close-icon {
    margin-inline-start: 6px;
    color: inherit;
    font-size: inherit;
  }

  &.clear {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.surfaceDarkOutline};
    background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
  }
`;
