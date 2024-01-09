import styled from 'styled-components';

interface PropsTag {
  bgcolor?: string;
  color?: string;
  padding?: string;
}

export const Wrapper = styled.div<PropsTag>`
  .ant-tag {
    border-radius: 10px;
    background-color: ${(props) =>
      props.bgcolor || props.theme.colors.surfaceDark};
    color: ${(props) => props.color || props.theme.colors.surfaceHight};
    padding: ${(props) => props.padding};
    cursor: pointer;
    .anticon {
      color: ${(props) => props.color || props.theme.colors.surfaceHight};
    }
  }
`;
