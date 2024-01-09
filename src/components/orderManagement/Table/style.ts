import { Link } from 'react-router-dom';
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

const ActionView = styled(Link)`
  width: 50;
`;

export { Header, Total, ActionView };
