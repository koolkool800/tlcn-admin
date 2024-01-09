import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0.0;
    visibility: hidden;
  }
  100% {
    opacity: 1.0;
    visibility: visible;
  }
`;
export const fadeOut = keyframes`
  0% {
    opacity: 1.0;
    visibility: visible;
  }
  100% {
    opacity: 0.0;
    visibility: hidden;
  }
`;

export const position = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
  }
`;

export const gradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
  }
`;

export const progress = keyframes`
  0% {
    stroke-dasharray: 0 100;
  }
`;

export const spinProgress = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const dotTimePicker = keyframes`
  0% { visibility: hidden; }
  100% { visibility: initial; }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;

export const spins = keyframes`
  0% { transform: rotate(360deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(0deg) }
`;
