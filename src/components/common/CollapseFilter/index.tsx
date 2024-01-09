/* eslint-disable react/no-unstable-nested-components */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { CollapseProps, Collapse } from 'antd';
import * as S from './style';

interface CollapseStyle extends CollapseProps {
  width?: number | string;
  direction?: 'horizontal' | 'vertical';
  IconExpand: React.ElementType;
}

function CollapseFilter({
  direction = 'vertical',
  width,
  items,
  IconExpand,
  ...restProps
}: CollapseStyle) {
  return (
    <S.Box options={{ direction }} width={width}>
      <Collapse
        bordered={false}
        items={items}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <IconExpand
            style={{ transform: isActive ? 'rotate(0deg)' : 'rotate(180deg)' }}
          />
        )}
        {...restProps}
      />
    </S.Box>
  );
}

export default CollapseFilter;
