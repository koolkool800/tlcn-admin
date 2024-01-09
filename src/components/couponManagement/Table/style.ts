import { styled } from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
  margin-top: 12px;
`;

const Total = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const Code = styled.div`
  display: flex;
  width: 120px;
  gap: 8px;
  cursor: pointer;
`;

const WrapperAction = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  .action {
    color: #39f;
    cursor: pointer;
  }
`;

export { Header, Total, Code, WrapperAction };
