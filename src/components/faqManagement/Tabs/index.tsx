import { Tabs as TabsAntd, TabsProps } from 'antd';
import * as S from './style';

const Tabs = (props: TabsProps) => {
  return (
    <S.TabsWrap>
      <TabsAntd {...props} />
    </S.TabsWrap>
  );
};

export default Tabs;
