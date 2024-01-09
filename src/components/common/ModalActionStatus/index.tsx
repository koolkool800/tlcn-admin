import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import TextAreaCustom from '@components/common/TextArea';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { Form } from 'antd';
import { useEffect } from 'react';
import * as S from './style';

type Props = {
  loading: boolean;
  open: boolean;
  type: 'approve' | 'reject' | undefined;
  onCancel: () => void;
  onSubmit: (values: any) => void;
};

const ModalActionStatus = ({
  loading,
  open,
  type,
  onCancel,
  onSubmit,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <>
      <Modal forceRender hiddenIcon={false} isOpen={open} onCancel={onCancel}>
        <S.Wrapper>
          <Form
            layout="vertical"
            name="ModalActionStatus"
            form={form}
            style={{ marginTop: 8 }}
            onFinish={onSubmit}
            initialValues={{ rejectedReason: '' }}
          >
            {type === 'approve' ? (
              <>
                <H5>Approve Request</H5>
                <div className="desc">
                  Are you sure approve this request seller?
                </div>
                <div className="action">
                  <Button onClick={onCancel}>Cancel</Button>
                  <PrimaryButton loading={loading} onClick={onSubmit}>
                    Approve
                  </PrimaryButton>
                </div>
              </>
            ) : (
              <>
                <H5>Reject Request</H5>

                <TextAreaCustom
                  rules={[
                    {
                      required: true,
                      message: 'Reason is required',
                    },
                  ]}
                  required
                  name="rejectedReason"
                  label="Reason"
                  placeholder="Enter reason"
                />
                <div className="action">
                  <Button onClick={onCancel}>Cancel</Button>
                  <Button loading={loading} htmlType="submit" bgcolor="red">
                    Reject
                  </Button>
                </div>
              </>
            )}
          </Form>
        </S.Wrapper>
      </Modal>
    </>
  );
};

export default ModalActionStatus;
