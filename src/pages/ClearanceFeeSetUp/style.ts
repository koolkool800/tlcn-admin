import { styled } from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  h5 {
    text-align: left;
    margin-bottom: 26px;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
export const Gap40 = styled(Wrap)`
  gap: 40px;
`;
export const Gap20 = styled(Wrap)`
  gap: 20px;
`;
