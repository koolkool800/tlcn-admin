import BannerManagementTable from '@components/bannerManagement/BannerTable';
import Button from '@components/common/Button';
import { PaginationChangeType } from '@components/common/Pagination';
import Tabs from '@components/faqManagement/Tabs';
import { CategoryBanner } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import useQueryString from '@hooks/useQueryString';
import bannerService from '@services/bannerService';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { pushParams } from '@utils/format';
import { getLimitParam, getOffset, getPageParam } from '@utils/table';
import { Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { BannerResponseResult } from 'interface/banner';
import { ObjectLiteral } from 'interface/general';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './style';

const BannerManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paramsURL: ObjectLiteral = useQueryString();
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<BannerResponseResult[]>([]);

  const [totalElement, setTotalElement] = useState(0);
  const [form] = useForm();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await bannerService.getBanners({
        category: paramsURL?.category,
        limit: getLimitParam(paramsURL),
        offset: getOffset(getPageParam(paramsURL), getLimitParam(paramsURL)),
      });
      setDataTable(response.data.data);
      setTotalElement(response?.data.length || 0);
      setIsEditingPosition(false);
    } catch (error) {
      /* empty */
    }
    setLoading(false);
  };
  const handleSubmitPosition = async (values: ObjectLiteral) => {
    if (new Set(Object.values(values)).size !== Object.values(values).length) {
      message.error('Do not set duplicate position');
    } else {
      try {
        const updateRespones = await bannerService.updatePositionListBanner(
          Object.entries(values).map((item) => ({
            id: item[0],
            position: item[1],
          }))
        );
        message.success(updateRespones.message);
        await fetchData();
        setIsEditingPosition(false);
      } catch (error: any) {
        message.error(error?.message);
      }
    }
  };

  const handleChangePaginate = (value: PaginationChangeType) => {
    pushParams(navigate, location, value as ObjectLiteral);
  };

  const onTabChange = (activeTab: string) => {
    navigate({
      pathname: '',
      search: queryString.stringify(
        { category: activeTab, page: 1 },
        { arrayFormat: 'comma' }
      ),
    });
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <S.BannerContainer>
      <H5>BANNER MANAGEMENT</H5>
      <div className="tabs-container">
        <Tabs
          className="tabs-banner"
          items={[
            { label: 'Primary Banner', key: CategoryBanner.PRIMARY },
            { label: 'Sub-Banner', key: CategoryBanner.SUB },
          ]}
          onChange={onTabChange}
        />
      </div>

      <div className="action-btns">
        {!isEditingPosition && (
          <>
            <Button
              width="fit-content"
              color="#000"
              bgcolor={theme.colors.primarySolid500}
              hoverbgcolor={theme.colors.primary510}
              onClick={() => {
                navigate({
                  pathname: ROUTES.CREATE,
                  search: queryString.stringify(
                    {
                      category: paramsURL?.category || CategoryBanner.PRIMARY,
                    },
                    { arrayFormat: 'comma' }
                  ),
                });
              }}
            >
              New banner
            </Button>
            <Button
              width="fit-content"
              color={theme.colors.primarySolid500}
              onClick={() => setIsEditingPosition(true)}
            >
              Edit position
            </Button>
          </>
        )}

        {isEditingPosition && (
          <>
            <Button
              width="fit-content"
              color="#000"
              bgcolor={theme.colors.primarySolid500}
              hoverbgcolor={theme.colors.primary510}
              onClick={() => form.submit()}
            >
              Save
            </Button>
            <Button
              width="fit-content"
              color={theme.colors.primarySolid500}
              onClick={() => setIsEditingPosition(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      <div className="table-container">
        <Form
          layout="vertical"
          form={form}
          name="form-position"
          onFinish={handleSubmitPosition}
        >
          <BannerManagementTable
            loading={loading}
            setLoading={setLoading}
            resources={dataTable}
            paginate={{
              length: totalElement,
              limit: getLimitParam(paramsURL),
              page: getPageParam(paramsURL),
            }}
            onChangePaginate={handleChangePaginate}
            fetchData={fetchData}
            isEditing={isEditingPosition}
            form={form}
          />
        </Form>
      </div>
    </S.BannerContainer>
  );
};

export default BannerManagement;
