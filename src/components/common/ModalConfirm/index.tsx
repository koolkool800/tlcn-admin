import { ModalProps } from 'antd';
import React from 'react';
import closeIcon from '../../../assets/images/close.png';
import successIcon from '../../../assets/images/successIcon.png';
import * as S from './styles';

interface Props extends ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  hiddenIcon?: boolean;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
}
const Modal = ({
  children,
  isOpen,
  hiddenIcon = true,
  okText,
  onCancel,
  onOk,
  ...restProps
}: Props) => {
  return (
    <S.ModalStyle
      closeIcon={<img src={closeIcon} alt="icon-close" />}
      centered
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      {...restProps}
    >
      <S.ModalContent>
        {hiddenIcon && (
          <div className="success-img">
            <img src={successIcon} alt={successIcon} />
          </div>
        )}
        {children}
      </S.ModalContent>
    </S.ModalStyle>
  );
};

export default Modal;
