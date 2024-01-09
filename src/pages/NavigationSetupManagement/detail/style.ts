import { styled } from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h5 {
    text-align: left;
  }
  .form-item-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      width: fit-content;
    }
    .input-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
      .btn-edit {
        display: flex;
        gap: 12px;
      }
    }
  }

  .table-edit {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
`;

export const NavigationSetUpContainer = styled.div``;
