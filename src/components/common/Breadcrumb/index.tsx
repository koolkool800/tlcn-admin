import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { ArrowRight2 } from 'iconsax-react';
import theme from '../../../style/themes/default';
import * as S from './styles';

type Props = {
  items?: BreadcrumbItemType[];
};

function Breadcrumb({ items }: Props) {
  return (
    <S.BreadcumbContainer>
      <BreadcrumbAntd
        items={items}
        separator={<ArrowRight2 size="24" color={theme.colors.surfaceMedium} />}
      />
    </S.BreadcumbContainer>
  );
}

export default Breadcrumb;
