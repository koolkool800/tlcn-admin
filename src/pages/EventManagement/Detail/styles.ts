import { styled } from 'styled-components';

export const Wrapper = styled.div`
  .container-button {
    display: flex;
    justify-content: flex-end;
  }
  .container-stadium {
    margin-top: 20px;
  }
  .container-chart {
    background-color: ${(props) => props.theme.colors.bgSurface};
    margin-top: 20px;
    border-radius: 20px;
    padding: 10px;
  }
`;
