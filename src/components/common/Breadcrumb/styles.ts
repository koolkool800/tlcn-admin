import { styled } from 'styled-components';

export const BreadcumbContainer = styled.div`
  .ant-breadcrumb-link {
    font-size: 15px;
    line-height: 20px;
    color: ${(props) => props.theme.colors.surfaceMedium};
    &.accent {
      color: ${(props) => props.theme.colors.primary550};
    }
  }
  .ant-breadcrumb a:hover {
    color: ${(props) => props.theme.colors.surfaceHight};
  }
  .ant-breadcrumb-separator {
    margin-inline: 16px;
  }

  .ant-breadcrumb ol li:last-child {
    .ant-breadcrumb-link {
      color: ${(props) => props.theme.colors.primary550};
      cursor: default;
    }
  }
`;
