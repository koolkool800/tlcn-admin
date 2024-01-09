import styled from 'styled-components';

export const PageNotFoundContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  h6 {
    font-weight: 400;
  }
  .btn-back {
    border-radius: 19.6px;
    background-color: ${(props) => props.theme.colors.primarySolid500};
    width: 100%;
    max-width: 272px;
    height: 52px;
    color: #000000;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 16px;
    padding: 14px;
  }
`;
