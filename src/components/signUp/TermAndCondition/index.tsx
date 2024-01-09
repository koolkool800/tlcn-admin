import Checkbox from '@components/common/Checkbox';
import { CheckboxGroup } from '@components/common/Checkbox/style';
import { Typography } from '@style/DefaultStyled';
import { Form } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useMemo, useState } from 'react';
import * as S from './style';

const listCheckbox = [
  //   {
  //     label: <Typography>Agree to all terms and conditions</Typography>,
  //     value: 'all',
  //   },
  {
    label: (
      <Typography>
        Term of services <S.TextRed>(Required)</S.TextRed>
      </Typography>
    ),
    value: '1',
  },
  {
    label: (
      <Typography>
        Collection and use of personal information{' '}
        <S.TextRed>(Required)</S.TextRed>
      </Typography>
    ),
    value: '2',
  },
  {
    label: (
      <Typography>
        You are 14 years of age or older <S.TextRed>(Essential)</S.TextRed>
      </Typography>
    ),
    value: '3',
  },
];

const TermAndCondition = () => {
  const form = Form.useFormInstance();

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const listCheckboxConvert = useMemo(() => {
    return listCheckbox.map((item) => item.value);
  }, []);

  const onChangeCheckbox = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < listCheckbox.length);
    setCheckAll(list.length === listCheckbox.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? listCheckboxConvert : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  useEffect(() => {
    form.setFieldsValue({ term: checkAll });
  }, [checkAll]);

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Agree to all terms and conditions
      </Checkbox>

      <CheckboxGroup value={checkedList} onChange={onChangeCheckbox}>
        {listCheckbox.map((item) => {
          return (
            <Checkbox key={item.value} value={item.value}>
              {item.label}
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </div>
  );
};

export default TermAndCondition;
