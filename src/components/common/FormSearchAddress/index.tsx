import { Form } from 'antd';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Input from '../Input';
import * as S from './style';

const FormSearchAddress = () => {
  const form = Form.useFormInstance();
  const [openDaum, setOpenDaum] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * event open DaumPostcodeEmbed library
   * @returns {void}
   */
  const handleShowDaumComponent = (): void => {
    setOpenDaum(true);
  };

  /**
   * event close DaumPostcodeEmbed library
   * @returns {void}
   */
  const handleHideDaumComponent = (): void => {
    setOpenDaum(false);
  };

  /**
   *
   * @param data value of DaumPostcodeEmbed library
   * @returns {void}
   */
  const handleComplete = (data: any): void => {
    form.setFieldsValue({
      address: data.address,
    });
  };

  /** used to hide DaumPostcodeEmbed library */
  useEffect(() => {
    function handleClickOutsideSignOut(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDaum(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsideSignOut);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutsideSignOut);
    };
  }, [wrapperRef]);

  return (
    <Form.Item>
      <S.Label>
        <span className="label">Address</span>
      </S.Label>
      <S.Wrapper>
        <>
          {openDaum && (
            <S.WrapperDaumCode ref={wrapperRef}>
              <DaumPostcodeEmbed
                onComplete={handleComplete}
                onClose={handleHideDaumComponent}
              />
              <CloseCircle
                size="32"
                className="icon"
                onClick={handleHideDaumComponent}
              />
            </S.WrapperDaumCode>
          )}

          <Input
            type="input"
            placeholder="Search address"
            suffix={<SearchNormal1 size="20" color="#FFFFFF" />}
            onClick={handleShowDaumComponent}
          />
        </>
        <Form.Item
          name="address"
          style={{ margin: 0, width: '100%' }}
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input allowClear type="input" placeholder="Address" />
        </Form.Item>
        <Form.Item name="detailAddress" style={{ margin: 0, width: '100%' }}>
          <Input allowClear type="input" placeholder="Detailed address" />
        </Form.Item>
      </S.Wrapper>
    </Form.Item>
  );
};

export default FormSearchAddress;
