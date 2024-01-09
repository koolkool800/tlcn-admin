import Button from '@components/common/Button';
import Modal from '@components/common/ModalConfirm';
import TextAreaCustom from '@components/common/TextArea';
import reportService from '@services/reportService';
import { H5, PrimaryButton } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { ObjectLiteral } from 'interface/general';
import { ReportType } from 'interface/report';
import { useState } from 'react';
import * as S from './style';

type Props = {
  open: boolean;
  setOpen: () => void;
  type: 'approve' | 'reject' | null;
  model: ReportType;
  callbackSuccess: () => void;
};

const ModalAction = ({
  open,
  setOpen,
  type,
  model,
  callbackSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body: ObjectLiteral = {};
      if (type === 'reject') {
        body.rejectedReason = form.getFieldValue('rejectedReason');
        body.status = 'REJECTED';
      } else {
        body.status = 'APPROVED';
      }
      await reportService.update(String(model?.reportId), body);

      message.success(
        type === 'approve' ? 'Approve successful' : 'Reject successful'
      );

      form.setFieldValue('rejectedReason', '');
      callbackSuccess();
      setOpen();
    } catch (error: any) {
      message.error(error?.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal hiddenIcon={false} isOpen={open} onCancel={setOpen}>
        <S.Wrapper>
          {type === 'approve' ? (
            <>
              <H5>Approve Report</H5>
              <div className="desc">Are you sure approve this report?</div>
              <div className="action">
                <Button onClick={setOpen} loading={loading}>
                  Cancel
                </Button>
                <PrimaryButton loading={loading} onClick={handleSubmit}>
                  Approve
                </PrimaryButton>
              </div>
            </>
          ) : (
            <>
              <H5>Reject Report</H5>
              <Form
                layout="vertical"
                form={form}
                style={{ marginTop: 8 }}
                onFinish={handleSubmit}
              >
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
                  <Button loading={loading} onClick={setOpen}>
                    Cancel
                  </Button>
                  <Button loading={loading} htmlType="submit" bgcolor="red">
                    Reject
                  </Button>
                </div>
              </Form>
            </>
          )}
        </S.Wrapper>
      </Modal>
    </>
  );
};

export default ModalAction;
