import { useEffect, useState } from 'react';
import { $$ } from '@utils/handleMap';
import { List } from 'antd';
import check from '@assets/images/mdi_check-circle.png';
import checked from '@assets/images/mdi_check-circle-checked.png';
import { Typography } from '@style/DefaultStyled';
import * as S from './style';

function checkProperties(obj: any, id: string | number) {
  if (!obj) return false;
  return (
    obj[id]?.minPrice !== undefined &&
    obj[id]?.minPrice !== '' &&
    obj[id]?.name !== undefined &&
    obj[id]?.name !== '' &&
    obj[id]?.originalPrice !== undefined &&
    obj[id]?.originalPrice !== ''
  );
}

function ListItems({ form }: { form?: any }) {
  const [listItem, setListItem] = useState<any>([]);
  useEffect(() => {
    const allGroups = Array.from($$('#Menu > g'));
    setListItem(
      allGroups.map((item) => ({
        name: item?.textContent?.trim(),
        id: item.getAttribute('id'),
      }))
    );
  }, []);
  return (
    <S.Wrapper>
      <List
        size="large"
        header={null}
        footer={null}
        bordered
        dataSource={listItem}
        renderItem={(item: { name: string; id: string | number }) => {
          return (
            <div className="container-item">
              <Typography className="item">{item?.name}</Typography>
              <img
                src={checkProperties(form?.groups, item.id) ? checked : check}
                alt="icon"
                width={20}
                height={20}
              />
            </div>
          );
        }}
        style={{ width: '100%' }}
      />
    </S.Wrapper>
  );
}

export default ListItems;
