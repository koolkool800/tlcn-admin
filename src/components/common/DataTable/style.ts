import { BaseColor } from '@constants/color';
import { Table } from 'antd';
import styled from 'styled-components';

export const TableAnt = styled(Table)`
  margin-bottom: 24px;
  &.ant-table-wrapper .ant-table {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.white};
    font-size: 14px;
    list-style: none;
    font-family: ${(props) => props.theme.font.variable};
    background-color: ${(props) => BaseColor.PRIMARY};
    border-radius: unset;
  }
  &.ant-table-wrapper .ant-table-thead > tr > th,
  &.ant-table-wrapper .ant-table-thead > tr > td {
    background: unset;
    border: unset;
  }
  &.ant-table-wrapper .ant-table-thead > tr > th {
    font-family: ${(props) => props.theme.font.variable};
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.surfaceMedium};
  }

  .ant-table-thead > tr > th.ant-table-cell:before {
    content: none !important;
  }
  &.ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    th:first-child {
    border-start-start-radius: 0;
  }
  &.ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    th:last-child {
    border-start-end-radius: 0;
  }
  .ant-table-tbody > tr:nth-child(even) {
    background-color: unset;
  }

  &.ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr.ant-table-row:hover
    > td,
  &.ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr
    > td.ant-table-cell-row-hover,
  &.ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr.ant-table-row.ant-table-row-selected
    > td {
    border-top-color: transparent;
  }
  &.ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr.ant-table-row:last-child:hover
    > td,
  &.ant-table-wrapper
    .ant-table:not(.ant-table-bordered)
    .ant-table-tbody
    > tr.ant-table-row.ant-table-row-selected:last-child
    > td {
    border-bottom-color: transparent;
  }
  &.ant-table-wrapper .ant-table-tbody > tr > td {
    transition: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.primarySolid950} !important;
  }
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td,
  &.ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .ant-table-cell {
    font-family: ${(props) => props.theme.font.variable};
    font-size: 14px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.white};
    background: rgba(255, 255, 255, 0.08);
  }

  &.ant-table-wrapper .ant-table-thead > tr > th {
    background-color: ${(props) => props.theme.colors.primarySolid950};
    color: ${(props) => props.theme.colors.surfaceHight};

    font-weight: 400;
  }

  &.ant-table-wrapper .ant-table-thead > tr > th:first-child {
    border-top-left-radius: 12px !important;
  }

  &.ant-table-wrapper .ant-table-thead > tr > th:last-child {
    border-top-right-radius: 12px !important;
  }

  &.ant-table-wrapper .ant-table-footer {
    background-color: ${(props) => props.theme.colors.primarySolid950};
    color: ${(props) => props.theme.colors.surfaceHight};

    background-image: linear-gradient(#2b564a);
  }

  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-row-selected > th,
  :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper
    .ant-table-tbody
    > tr.ant-table-row-selected
    > td {
    background: ${(props) => props.theme.colors.primarySolid950};
  }
  .ant-table-content {
    overflow-x: auto;
    overflow-y: hidden;
  }

  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder,
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover,
  &.ant-table-wrapper .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: rgba(255, 255, 255, 0.08) !important;
  }

  .ant-empty-description {
    color: white;
  }

  &.ant-table-wrapper
    .ant-table-tbody
    .ant-table-row.ant-table-row-selected
    > .ant-table-cell {
    background: rgba(255, 255, 255, 0.08);
  }
`;
