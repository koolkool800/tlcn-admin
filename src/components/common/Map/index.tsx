/* eslint-disable import/no-extraneous-dependencies */
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { memo, useEffect } from 'react';
import { Container } from '@style/DefaultStyled';
import {
  $$,
  handleGetValueFromClick,
  handleGetValueItem,
  handleActiveInitialItem,
} from '@utils/handleMap';
import * as S from './style';

function Map({
  stadiumMap,
  isStatic,
  onClick,
  onClickItem,
  selectedClass,
}: {
  stadiumMap: any;
  isStatic?: boolean;
  onClick?: any;
  onClickItem?: any;
  selectedClass?: string;
}) {
  useEffect(() => {
    const gElements = Array.from($$('g[id="Group"] > g '));
    const gElementsItem = Array.from($$('g[id="Group"] > g > g'));
    const WrapperFunction = (e: any) => {
      const mapInfo = handleGetValueFromClick(e);
      onClick(mapInfo);
    };
    const WrapperFunctionItem = (e: any) => {
      const item = handleGetValueItem(e);
      onClickItem(item);
    };
    if (selectedClass) {
      handleActiveInitialItem(selectedClass);
    }
    if (!isStatic) {
      gElements.forEach((element: Element) => {
        (element as HTMLElement).style.cursor = 'pointer';
        element.addEventListener('click', WrapperFunction);
      });
      gElementsItem.forEach((element: Element) => {
        element.addEventListener('click', WrapperFunctionItem);
      });
    }
    return () => {
      gElements.forEach((element: Element) => {
        element.removeEventListener('click', WrapperFunction);
      });
      gElementsItem.forEach((element: Element) => {
        element.removeEventListener('click', WrapperFunctionItem);
      });
    };
  }, [stadiumMap]);
  return (
    <S.Wrapper>
      <div className="container-img">
        <TransformWrapper>
          <TransformComponent>
            <div dangerouslySetInnerHTML={{ __html: stadiumMap }} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </S.Wrapper>
  );
}
export default memo(Map);
