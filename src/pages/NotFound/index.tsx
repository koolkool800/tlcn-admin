import page404 from '@assets/images/page404.png';
import { Container, H5, H6 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as S from './style';

function NotFound() {
  const { t } = useTranslation('');
  return (
    <Container>
      <S.PageNotFoundContain>
        <img src={page404} alt="Page not found" />
        <H5>{t('common.page404.title')}</H5>
        <H6>{t('common.page404.message')}</H6>

        <Link className="btn-back" to="/">
          {t('common.page404.btnBack')}
        </Link>
      </S.PageNotFoundContain>
    </Container>
  );
}

export default NotFound;
