/* eslint-disable prefer-promise-reject-errors */
import { Typography, PrimaryButton } from '@style/DefaultStyled';
import { Form } from 'antd';
import Input from '@components/common/Input';
import SwitchCustom from '@components/common/Switch';
import { memo, useEffect, useRef, useState } from 'react';
import InputNumber from '@components/common/InputNumber';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import * as S from './style';
import BoxSection from '../BoxSection';
import BoxFloor from '../BoxFloor';

const BoxClass = ({
  dataMap,
  selectedSection,
  isShown,
  eventId,
  isStatic,
}: {
  dataMap: {
    groupId: number;
    groupName: string;
    sections: string[];
    floors?: any[];
    isObstructed?: boolean;
    originalPrice?: number;
    minPrice?: number;
    color?: string;
    id?: string | number;
  };
  selectedSection?: string;
  eventId?: string | number;
  isShown: boolean;
  isStatic?: boolean;
}) => {
  const {
    groupId,
    groupName,
    sections,
    floors,
    isObstructed,
    originalPrice,
    id,
    minPrice: minPriceOut,
  } = dataMap;
  const [itemClicked, setItemClicked] = useState<any>(selectedSection);
  const form = Form.useFormInstance();
  useEffect(() => {
    setItemClicked(selectedSection);
  }, [selectedSection]);
  return (
    <S.Wrapper isshown={JSON.stringify(isShown)}>
      <div className="container-header-box">
        <Form.Item
          name={['groups', groupId, 'color']}
          initialValue={dataMap.color}
        >
          <span />
        </Form.Item>
        <Form.Item name={['groups', groupId, 'id']} initialValue={id}>
          <span />
        </Form.Item>
        <Typography>Class:</Typography>
        <Form.Item
          style={{ marginBottom: 0 }}
          initialValue={groupName}
          name={['groups', groupId, 'name']}
        >
          <Input placeholder="Enter class Name" disabled={isStatic} />
        </Form.Item>
        <Form.Item
          name={['groups', groupId, 'originalPrice']}
          style={{ marginBottom: 'unset' }}
          initialValue={originalPrice}
          rules={[
            {
              required: true,
              message: 'price cannot be less than 1',
              type: 'number',
              min: 1,
            },
          ]}
        >
          <InputNumber
            disabled={isStatic || !!eventId}
            placeholder="Enter Original price ($)"
            formatter={(value = 0) => {
              return formatNumberWithCommas(value);
            }}
          />
        </Form.Item>
        <Form.Item
          name={['groups', groupId, 'minPrice']}
          style={{ marginBottom: 'unset' }}
          initialValue={minPriceOut}
          rules={[
            {
              required: true,
              message: 'price cannot be less than 1',
              type: 'number',
              min: 1,
            },
          ]}
        >
          <InputNumber
            disabled={isStatic || !!eventId}
            placeholder="Enter min price ($)"
            formatter={(value = 0) => {
              return formatNumberWithCommas(value);
            }}
          />
        </Form.Item>
        {!isStatic ? (
          <div className="container-switch-custom">
            <SwitchCustom
              name={['groups', groupId, 'restricted']}
              initialValue={isObstructed}
              defaultChecked={isObstructed}
            />
            <Typography>Restricted view seat</Typography>
          </div>
        ) : (
          <div className="restricted-view">
            {isObstructed ? (
              <Typography>Restricted view seat</Typography>
            ) : null}
          </div>
        )}
      </div>
      <div className="container-zone">
        <span>zone: </span>
        {[...new Set(sections)]?.map((section: any) => {
          const nameSection = eventId ? section.name : section;
          return (
            <BoxSection
              section={section}
              key={`${section.id} - ${Math.random() * 100}`}
              itemActive={itemClicked === nameSection}
              nameClass={groupId}
              eventId={eventId}
              name={nameSection}
              initialValueFloor={floors}
              onClick={(value: string) => {
                setItemClicked(value);
              }}
            />
          );
        })}
      </div>
      <Form.List name={['groups', groupId, 'zone', itemClicked, 'floor']}>
        {(fields, { add, remove }) => {
          return (
            <>
              <div className="container-floor">
                {fields.map((item, index) => (
                  <BoxFloor
                    groupId={groupId}
                    groupName={groupName}
                    key={item?.key}
                    fieldsPass={fields}
                    itemClicked={itemClicked}
                    index={index}
                    isStatic={isStatic}
                    onRemove={() => {
                      if (fields.length > 1) {
                        remove(item.name);
                      }
                    }}
                  />
                ))}
              </div>
              {!isStatic && (
                <PrimaryButton style={{ marginTop: 10 }} onClick={() => add()}>
                  Add New Floor
                </PrimaryButton>
              )}
            </>
          );
        }}
      </Form.List>
    </S.Wrapper>
  );
};

export default memo(BoxClass);
