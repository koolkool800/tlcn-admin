import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  isolation: isolate;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.08);

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;
