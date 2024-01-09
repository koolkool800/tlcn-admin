import styled from 'styled-components';

export const WrapperFooter = styled.div`
  background-color: ${(props) => props.theme.colors.surfaceDarkBackground};
  height: 380px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 20px 0;
  color: white;
`;

export const WrapperActions = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
  .container-navigate-left {
    span {
      color: ${(props) => props.theme.colors.white}!important;
      padding: 20px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }
  }
  .container-navigate-right {
    span {
      color: ${(props) => props.theme.colors.white}!important;
      padding: 10px;
      font-size: 20px;
    }
  }
`;

export const WrapperInfo = styled.div`
  display: flex;
  max-width: 1200px;
  gap: 50px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;
