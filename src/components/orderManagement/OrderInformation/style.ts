import { styled } from 'styled-components';

const Wrapper = styled.div`
  border-radius: 14px;
  padding: 24px;
  background: linear-gradient(
    180deg,
    rgba(67, 230, 181, 0.4) 0%,
    rgba(7, 106, 106, 0.4) 100%
  );
`;

const Information = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 24px;
  .item {
    display: flex;
    gap: 4px;
    flex-direction: column;
    .title {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      color: ${(props) =>
        props.theme.colors.emphasisLightColorMedium} !important;
    }

    .value {
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
    }
  }
`;

export { Wrapper, Information };
