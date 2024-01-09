import { styled } from 'styled-components';

export const CardTopEventContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  .image-cover {
    /* height: 330px; */
    width: 100%;
    img {
      border-radius: 14px;
      object-fit: cover;
      /* height: 100%; */
      width: 100%;
      aspect-ratio: 7/10;
    }
  }
  .event-info {
    p {
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${(props) => props.theme.colors.surfaceMedium};
    }
  }
`;
