import styled from 'styled-components';

export const Wrapper = styled.div`
  .desc {
    margin-top: 24px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: ${(props) => props.theme.colors.white};
  }

  .action {
    margin-top: 24px;
    display: flex;
    gap: 16px;
  }

  form {
    text-align: left;
  }
`;
