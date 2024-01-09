import FormInquiry from '@components/inquiryManagement/Form';
import inquiryService from '@services/inquiryService';
import { H5 } from '@style/DefaultStyled';
import { InquiryType } from 'interface/inquiry';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from '../List/style';

const View = () => {
  const params = useParams();
  const [model, setModel] = useState<InquiryType | null>(null);

  const fetchData = async () => {
    try {
      const res = await inquiryService.getDetail(Number(params?.id));
      setModel(res?.data);
    } catch (err) {
      /* empty */
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  return (
    <S.Wrapper>
      <H5 className="title">1:1 INQUIRY MANAGEMENT VIEW</H5>
      <FormInquiry model={model as InquiryType} isView />
    </S.Wrapper>
  );
};

export default View;
