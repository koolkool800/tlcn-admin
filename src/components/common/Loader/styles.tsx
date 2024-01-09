import { styled } from 'styled-components';

export const Loader = styled.div`
  /* position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1248px;
  background-color: ${(props) => props.theme.colors.surfaceHight};

  .spinner {
    width: 60px;
    height: 60px;
    position: relative;
  }

  .spinner .dot {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
  }

  .spinner .dot::after {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary500};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner .dot {
    animation: spin 2s infinite;
  }

  .spinner .dot:nth-child(2) {
    animation-delay: 100ms;
  }

  .spinner .dot:nth-child(3) {
    animation-delay: 200ms;
  }

  .spinner .dot:nth-child(4) {
    animation-delay: 300ms;
  }

  .spinner .dot:nth-child(5) {
    animation-delay: 400ms;
  } */

  margin: -8px;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.surfaceDarkBackground};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;

  img {
    animation: zoom-in-zoom-out 3s ease infinite;
  }

  @keyframes zoom-in-zoom-out {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;
