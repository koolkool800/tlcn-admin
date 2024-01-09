import useParam from '@hooks/useParam';
import { PaginationProps } from 'antd';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as S from './style';

export type PaginationTable = {
  length: number;
  limit: number;
  page: number;
};

export type PaginationChangeType = Pick<PaginationTable, 'limit' | 'page'>;

type Props = {
  paginationTable: PaginationTable;
  onChangePage?: ({ page, limit }: PaginationChangeType) => void;
  hasPushParams?: boolean;
};
function Pagination({
  paginationTable,
  onChangePage,
  hasPushParams = true,
}: Props) {
  const location = useLocation();
  const params = useParam();

  /**
   * event when change page current
   * @param page
   * @param limit
   * @returns {void}
   */
  const onChangePagination: PaginationProps['onChange'] = (
    page,
    limit
  ): void => {
    if (onChangePage) {
      onChangePage({ page, limit });
    }
  };

  /**
   * get total page
   * @returns number
   */
  const totalPage = useMemo(() => {
    return Math.ceil(paginationTable.length / paginationTable.limit || 1);
  }, [paginationTable.length, paginationTable.limit]);

  return (
    <S.PaginationAnt
      hideOnSinglePage
      current={Number(paginationTable.page)}
      pageSize={paginationTable.limit}
      total={paginationTable.length}
      onChange={onChangePagination}
      showSizeChanger={false}
      itemRender={(page, type, originalElement) => {
        if (['jump-prev', 'jump-next'].includes(type)) {
          return originalElement;
        }

        if (!hasPushParams) {
          return originalElement;
        }

        const newParams = typeof params === 'object' ? { ...params } : {};
        newParams.page = String(page);
        const newURL = new URLSearchParams(newParams).toString();

        if (type === 'prev') {
          return (
            <NavLink
              to={`${location.pathname}?${newURL}`}
              onClick={(e) => {
                if (page <= 0) e.preventDefault();
              }}
            >
              <span className="ant-pagination-item-link">
                <ArrowLeft2 />
              </span>
            </NavLink>
          );
        }
        if (type === 'next') {
          return (
            <NavLink
              to={`${location.pathname}?${newURL}`}
              onClick={(e) => {
                if (page > totalPage) e.preventDefault();
              }}
            >
              <span className="ant-pagination-item-link">
                <ArrowRight2 />
              </span>
            </NavLink>
          );
        }

        return <NavLink to={`${location.pathname}?${newURL}`}>{page}</NavLink>;
      }}
    />
  );
}

export default Pagination;
