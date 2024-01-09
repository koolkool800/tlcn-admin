import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { PaginationChangeType } from '@components/common/Pagination';
import DataTableNavigation from '@components/navigationSetUpS/DataTableNavigation';
import ModalSelectEvents from '@components/navigationSetUpS/ModalSelectEvents';
import navigationService from '@services/navigationService';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { getOffset } from '@utils/table';
import { message } from 'antd';
import { Edit2 } from 'iconsax-react';
import { ObjectLiteral, PaginateType, initFilter } from 'interface/general';
import { EventDetail } from 'interface/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';

const NavigationSetupDetail = () => {
  const params: ObjectLiteral = useParams();

  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState<EventDetail[]>([]);
  const [isModalSetUpOpen, setIsModalSetUpOpen] = useState(false);

  const [paginate, setPaginate] = useState<PaginationChangeType>({
    limit: 10,
    page: 1,
  });
  const [paginateTable, setPaginateTable] = useState<PaginateType>({
    ...initFilter,
    ...paginate,
  });

  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const enableInput = () => {
    setDisabled(!disabled);
  };
  const handleChangeInput = (value: string) => {
    setInputValue(value);
  };

  /** * Fetch user detail */
  const fetchNameCategory = async () => {
    try {
      const res = await navigationService.getDetail(String(params?.id));
      setInputValue(res?.data?.name || '');
    } catch (err) {
      /* empty */
    }
  };
  const fetchListEvent = async () => {
    setLoading(true);
    try {
      const requestParams = { navCateId: Number(params?.id), ...paginate };
      const res = await navigationService.getListEventDetail({
        ...requestParams,
        offset: getOffset(paginate.page, paginate.limit),
      });

      const convertData = res?.data?.data?.map((item) => ({
        key: item.id,
        ...item,
      }));
      setDataTable(convertData);
      setPaginateTable({
        ...paginateTable,
        ...paginate,
        length: res?.data?.length,
      });
    } catch (err) {
      /* empty */
    }
    setLoading(false);
  };

  useEffect(() => {
    if (params?.id) {
      fetchNameCategory();
    }
  }, [params?.id]);

  useEffect(() => {
    if (params?.id && !isModalSetUpOpen) {
      fetchListEvent();
    }
  }, [isModalSetUpOpen, paginate]);

  /**
   * event update navigation name
   * @returns {Promise<void>}
   */
  const updateNavigationName = async (): Promise<void> => {
    try {
      const requestParams = {
        id: Number(params?.id),
        name: inputValue,
      };
      const res = await navigationService.update(requestParams);
      message.success(res.message);
      setDisabled(!disabled);
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const handleChangePaginate = (value: PaginationChangeType) => {
    setPaginate({
      ...paginate,
      ...value,
    });
  };
  return (
    <S.Layout>
      <H5>NAVIGATION SET UP</H5>
      <div className="form-wrap">
        <div className="form-item-wrap">
          <div className="input-wrap">
            <Input
              type="input"
              placeholder=""
              disabled={disabled}
              onChange={(e) => handleChangeInput(e.target.value)}
              value={inputValue}
            />
            <div className="btn-edit">
              {disabled ? (
                <Edit2
                  style={{ cursor: 'pointer' }}
                  size="24"
                  color={theme.colors.primarySolid500}
                  onClick={enableInput}
                />
              ) : (
                <Button
                  onClick={updateNavigationName}
                  bgcolor={theme.colors.primarySolid500}
                  color="#000"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-edit">
          <Typography>Event site list</Typography>
          <Edit2
            style={{ cursor: 'pointer' }}
            size="24"
            color={theme.colors.primarySolid500}
            onClick={() => setIsModalSetUpOpen(true)}
          />
        </div>
        <DataTableNavigation
          loading={loading}
          resources={dataTable}
          paginate={paginateTable}
          onChangePaginate={handleChangePaginate}
          scroll={{ x: 300 }}
        />
      </div>
      {isModalSetUpOpen && (
        <ModalSelectEvents
          open={isModalSetUpOpen}
          navigationId={Number(params?.id)}
          onCancel={() => setIsModalSetUpOpen(false)}
        />
      )}
    </S.Layout>
  );
};

export default NavigationSetupDetail;
