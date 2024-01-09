import { Typography } from '@style/DefaultStyled';
import {
  DocumentCopy,
  Trash,
  AddCircle,
  RecordCircle,
  CloseCircle,
} from 'iconsax-react';
import { Divider, Form } from 'antd';
import { useEffect, useRef } from 'react';
import Input from '@components/common/Input';
import BoxRow from '../BoxRow';
import * as S from './style';

function checkFloorNameExist(
  floorsData: { name: string }[],
  inputValue: string,
  indexRow: number
) {
  const filerRow = floorsData.filter((_, index: number) => index !== indexRow);
  const isRowNameExist = filerRow?.some((floor) => floor.name === inputValue);
  if (isRowNameExist) {
    return Promise.reject(new Error('name already exists'));
  }
  return Promise.resolve();
}

const BoxFloor = ({
  groupId,
  groupName,
  itemClicked,
  index,
  fieldsPass,
  isStatic,
  onRemove,
  onDuplicate,
}: {
  groupId: number;
  groupName: string;
  itemClicked: string;
  index: number;
  fieldsPass: any;
  isStatic?: boolean;
  onRemove: () => void;
  onDuplicate?: any;
}) => {
  const floorRef: any = useRef();
  const form = Form.useFormInstance();
  const namePath = ['groups', groupId, 'zone', itemClicked, 'floor'];
  const floorsData = Form.useWatch(namePath, form);
  useEffect(() => {
    if (
      floorRef.current &&
      fieldsPass.length === Number(floorRef.current.getAttribute('id')) &&
      !isStatic
    ) {
      floorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [fieldsPass]);
  return (
    <S.Wrapper ref={floorRef ?? null} id={JSON.stringify(index + 1)}>
      <div className="container-title-floor">
        <Form.Item
          name={[index, 'name']}
          initialValue={`Floor ${index + 1}`}
          rules={[
            {
              validator: (_, value) =>
                checkFloorNameExist(floorsData, value, index),
            },
            {
              required: true,
              message: 'Floor is required',
            },
          ]}
        >
          <Input placeholder="Enter Row" disabled={isStatic} />
        </Form.Item>

        <div className="container-icon">
          {/* <DocumentCopy onClick={() => onDuplicate(floor)} /> */}
          {!isStatic && (
            <Trash
              style={{
                cursor: fieldsPass.length > 1 ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                onRemove();
              }}
            />
          )}
        </div>
      </div>
      <Divider className="line" />
      <div className="container-row">
        <Form.List name={[index, 'row']} initialValue={[{ name: 'Row' }]}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((item, i) => (
                  <div key={item.key} className="container-row-item">
                    <RecordCircle style={{ marginRight: 10 }} />
                    <BoxRow
                      key={item.key}
                      groupId={groupId}
                      groupName={groupName}
                      sectionName={itemClicked}
                      fieldsPass={fields}
                      index={index}
                      indexRow={i}
                      add={add}
                      isStatic={isStatic}
                    />
                    {!isStatic && (
                      <CloseCircle
                        style={{
                          cursor: fields.length > 1 ? 'pointer' : 'not-allowed',
                          marginLeft: 10,
                        }}
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(item.name);
                          }
                        }}
                      />
                    )}
                  </div>
                ))}
                {!isStatic && (
                  <div
                    className="container-add"
                    onClick={() => add({ name: null })}
                    onKeyDown={(e) => {}}
                    role="button"
                    tabIndex={0}
                  >
                    <AddCircle style={{ marginRight: 10 }} />
                    <Typography>Add new row</Typography>
                  </div>
                )}
              </div>
            );
          }}
        </Form.List>
      </div>
      <div />
    </S.Wrapper>
  );
};

export default BoxFloor;
