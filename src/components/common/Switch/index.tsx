import { Switch, Form } from 'antd';
import * as S from './style';

type Props = {
  defaultChecked?: boolean;
  initialValue?: boolean;
  name: any[];
};

function SwitchCustom({ defaultChecked, name, initialValue }: Props) {
  return (
    <S.Wrapper>
      <Form.Item
        name={name}
        initialValue={initialValue}
        valuePropName="checked"
      >
        <Switch defaultChecked={!!defaultChecked} />
      </Form.Item>
    </S.Wrapper>
  );
}

export default SwitchCustom;
