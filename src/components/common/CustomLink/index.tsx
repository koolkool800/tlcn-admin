import { LinkProps } from 'react-router-dom';
import * as S from './style';

type CustomLinkProps = LinkProps;

function CustomLink({ children, ...props }: CustomLinkProps) {
  return <S.StyledLink {...props}>{children}</S.StyledLink>;
}
export default CustomLink;
