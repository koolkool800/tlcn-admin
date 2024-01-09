import Button from '@components/common/Button';
import InputSearch from '@components/common/InputSearch';
import { PaginationChangeType } from '@components/common/Pagination';
import FAQManagementTable from '@components/faqManagement/FAQManagementTable';
import { ROUTES } from '@constants/routes';
import useQueryString from '@hooks/useQueryString';
import faqService from '@services/faqServices';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form } from 'antd';
import { FaqsResponseType } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const FaqManagement = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const paramsURL: ObjectLiteral = useQueryString();
  const [dataTable, setDataTable] = useState<FaqsResponseType[]>([]);
  const [totalElement, setTotalElement] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeSearch = (formValue: ObjectLiteral) => {
    pushParams(navigate, location, { ...formValue, page: 1 });
  };
  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };
  const loadFaq = async () => {
    setLoading(true);
    try {
      const faqRes = await faqService.getFAQs({
        limit: getLimitParam(paramsURL),
        offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
        q: paramsURL?.q,
      });
      setDataTable(faqRes.data.data || []);
      setTotalElement(faqRes.data.length);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFaq();
  }, [location.search]);

  return (
    <S.FaqContainer>
      <H5>FAQ MANAGEMENT</H5>
      <div className="action-wrap">
        <Form form={form} onFinish={handleChangeSearch}>
          <div className="input-search-wrap">
            <InputSearch
              name="q"
              defaultValue={paramsURL?.q}
              placeholder="Search by question"
            />
          </div>
        </Form>

        <Button
          className="btn-create"
          bgcolor={theme.colors.primarySolid500}
          color="#000"
          onClick={() => navigate(ROUTES.CREATE)}
        >
          Create FAQ
        </Button>
      </div>

      <div className="table-wrap">
        <FAQManagementTable
          loading={loading}
          resources={dataTable}
          setLoading={setLoading}
          paginate={{
            length: totalElement,
            limit: getLimitParam(paramsURL),
            page: getPageParam(paramsURL),
          }}
          onChangePaginate={handleChangePaginate}
          fetchData={loadFaq}
        />
      </div>
    </S.FaqContainer>
  );
};

export default FaqManagement;
