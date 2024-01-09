import PdfIcon from '@assets/images/pdf.png';
import { H5, Typography } from '@style/DefaultStyled';
import { Modal } from 'antd';
import { useState } from 'react';
import * as S from './style';

type Props = {
  attachments: string[];
};

const toDataUrl = async (url: string) => {
  const response: any = await fetch(url);
  const data: any = await response.blob();

  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(data);
  });
};

const ViewAttachment = ({ attachments }: Props) => {
  const [previewImage, setPreviewImage] = useState<any>();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleCancelReview = () => {
    setPreviewOpen(false);
  };

  const handlePreview = async (url: string) => {
    const fileName = 'Preview.pdf';
    const lastDotIndex = url.lastIndexOf('.');
    const fileExtension = url.substring(lastDotIndex + 1);

    setPreviewImage({
      fileExtension,
      previewImage: url,
      previewTitle: fileName,
    });
    setPreviewOpen(true);
  };

  return (
    <>
      {attachments?.map((item: string, index: number) => {
        const arrItem = String(item)?.split('.');
        const extension = arrItem[arrItem.length - 1];

        if (extension?.toLowerCase() === 'pdf') {
          return (
            <S.Wrapper
              key={`${item}_${String(index)}`}
              onClick={() => handlePreview(item)}
            >
              <img src={PdfIcon} alt="pdf" />
            </S.Wrapper>
          );
        }

        return (
          <S.Wrapper
            key={`${item}_${String(index)}`}
            onClick={() => handlePreview(item)}
          >
            <img src={item} alt="pdf" />
          </S.Wrapper>
        );
      })}
      <Modal
        open={previewOpen}
        modalRender={(node) => <S.ModalContainer>{node}</S.ModalContainer>}
        footer={null}
        onCancel={handleCancelReview}
      >
        {previewImage?.fileExtension === 'pdf' ? (
          <div style={{ width: '100%' }}>
            <H5>PDF Preview</H5>
            <embed
              style={{ marginTop: '1rem' }}
              src={previewImage?.previewImage}
              width="100%"
              height="500px"
            />
          </div>
        ) : (
          <div>
            <H5>Image Preview</H5>
            <div style={{ marginTop: '1rem' }}>
              <img
                alt="example"
                style={{ width: '100%', height: '100%' }}
                src={previewImage?.previewImage}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ViewAttachment;
