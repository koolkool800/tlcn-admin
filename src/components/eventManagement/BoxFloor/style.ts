import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 10px;
  min-width: 50px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
  text-align: center;
  border-radius: 10px;
  .container-row-item {
    min-width: 50px;
    display: flex;
    padding: 10px 0;
    svg {
      margin-right: 10px;
      color: ${(props) => props.theme.colors.emphasisDarkSurfaceSmall};
    }
  }
  .container-title-floor {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .container-icon {
      svg:first-child {
        margin-right: 10px;
      }
    }
  }
  .line {
    margin: 10px 0;
  }
  .container-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;

    .container-add {
      display: flex;
      cursor: pointer;
    }
  }
`;
