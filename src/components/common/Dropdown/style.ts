import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-color: unset;
  cursor: pointer;
  user-select: none;
  gap: 7px;
  font-size: 15px;
  line-height: 20px;
  border-radius: 14px;
  font-family: ${(props) => props.theme.font.variable};
  color: ${(props) => props.theme.colors.surfaceSmall};
  background-color: ${(props) => props.theme.colors.surfaceDark};
  .arrow {
    color: ${(props) => props.theme.colors.surfaceHight};
  }
`;
