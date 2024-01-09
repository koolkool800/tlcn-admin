import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 154px;
  margin-bottom: 100px;
`;
export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  h3 {
    color: ${(props) => props.theme.colors.white};
    font-family: ${(props) => props.theme.font.variable};
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
  }
`;
export const Social = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
