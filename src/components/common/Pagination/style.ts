import { Pagination } from 'antd';
import styled from 'styled-components';

export const PaginationAnt = styled(Pagination)`
  &.ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.surfaceHight};
    font-size: 15px;
    line-height: 20px;
    font-family: ${(props) => props.theme.font.variable};
  }

  &.ant-pagination .ant-pagination-item {
    margin-inline-end: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 14px;
    /* background-color: rgba(255, 255, 255, 0.08); */
    /* border: 1px solid rgba(255, 255, 255, 0.08); */

    a {
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      font-family: ${(props) => props.theme.font.variable};
      color: ${(props) => props.theme.colors.surfaceHight};
    }
  }

  &.ant-pagination .ant-pagination-item-active {
    background-color: #2b564a;
    border: none;
    a {
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      color: ${(props) => props.theme.colors.primarySolid500};
    }
  }
  &.ant-pagination .ant-pagination-prev .ant-pagination-item-link,
  &.ant-pagination .ant-pagination-next .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.surfaceHight};
    width: 40px;
    height: 40px;
    border-radius: 14px;
    font-size: 15px;
    line-height: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
    color: #e6e6e6;
  }

  &.ant-pagination .ant-pagination-prev,
  &.ant-pagination .ant-pagination-next {
    width: 40px;
    height: 40px;
  }

  &.ant-pagination .ant-pagination-item:hover {
    background-color: rgba(83, 246, 198, 0.7);
  }

  &.ant-pagination .ant-pagination-item-ellipsis {
    color: ${(props) => props.theme.colors.surfaceHight} !important;
  }

  &.ant-pagination .ant-pagination-jump-next {
    width: 32px !important;
    height: 32px !important;
  }
`;
