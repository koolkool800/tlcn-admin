import { Space, Typography } from 'antd';
import * as S from './style';

const { Text } = Typography;

const ItemInfoCompany = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => {
  return (
    <S.WrapperItem>
      <Space direction="vertical">
        <Text className="title">{title}</Text>
        <div className="paragraph">{content}</div>
      </Space>
    </S.WrapperItem>
  );
};

export default ItemInfoCompany;
