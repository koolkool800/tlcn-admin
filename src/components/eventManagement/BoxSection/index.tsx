import { Typography } from '@style/DefaultStyled';
import { Form } from 'antd';
import * as S from './style';

function checkArr(obj: any) {
  if (obj) {
    const newObj = { ...obj };
    return newObj;
  }
  return { floors: [{ row: [{ name: 'Row' }], name: 'Floor 1' }] };
}

const BoxSection = ({
  name,
  nameClass,
  onClick,
  section,
  eventId,
  itemActive,
  initialValueFloor,
}: {
  name: string;
  nameClass: string | number;
  onClick: any;
  section: any;
  eventId?: number | string;
  initialValueFloor: any;
  itemActive: boolean;
}) => {
  const floorInitial = initialValueFloor?.find(
    (item: any) => item.name === name
  );
  const initialData = eventId
    ? {
        floor: checkArr(floorInitial).floors,
        name,
        id: section.id,
      }
    : {
        floor: checkArr(floorInitial).floors,
        name,
      };
  return (
    <Form.Item
      name={['groups', nameClass, 'zone', name]}
      style={{ cursor: 'pointer' }}
      initialValue={initialData}
    >
      <S.Wrapper itemactive={JSON.stringify(itemActive)}>
        <Typography onClick={() => onClick(name)}>{name}</Typography>
      </S.Wrapper>
    </Form.Item>
  );
};

export default BoxSection;
