import React, { useEffect, useRef } from 'react';
import { Form } from 'antd';
import Input from '@components/common/Input';
import * as S from './style';

function checkRowNameExist(
  rowsData: { name: string }[],
  inputValue: string,
  indexRow: number
) {
  const filerRow = rowsData.filter((_, index: number) => index !== indexRow);
  const isRowNameExist = filerRow?.some((row) => row.name === inputValue);
  if (isRowNameExist) {
    return Promise.reject(new Error('name already exists'));
  }
  return Promise.resolve();
}

const BoxRow = ({
  groupId,
  groupName,
  sectionName,
  index,
  indexRow,
  isStatic,
  fieldsPass,
  add,
}: {
  groupId: number;
  groupName: string;
  sectionName: string;
  index: number;
  indexRow: number;
  isStatic?: any;
  fieldsPass: any[];
  add: any;
}) => {
  const form = Form.useFormInstance();
  const namePath = [
    'groups',
    groupId,
    'zone',
    sectionName,
    'floor',
    index,
    'row',
  ];
  const rowsData = Form.useWatch(namePath, form);
  return (
    <Form.Item
      name={[indexRow, 'name']}
      style={{ cursor: 'pointer', display: 'flex' }}
      rules={[
        {
          validator: (_, value) => checkRowNameExist(rowsData, value, indexRow),
        },
        {
          required: true,
          message: 'Row is required',
        },
      ]}
    >
      <Input
        placeholder="Enter Row"
        disabled={isStatic}
        onPressEnter={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
          add({ name: null });
        }}
        autoFocus
      />
    </Form.Item>
  );
};

export default BoxRow;
