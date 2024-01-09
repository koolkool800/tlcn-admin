import { Tag, TagProps } from 'antd';
import * as S from './style';

interface TagType extends TagProps {
  color?: string;
  bgColor?: string;
  padding?: string;
  content?: string;
  nameSpace: string;
  onRemove?: (nameSpace: string) => void;
  onRemoveAll?: () => void;
  handleOnClick?: () => void;
}

function TagCustom({
  color,
  bgColor,
  padding,
  content,
  bordered,
  nameSpace,
  onRemove,
  onRemoveAll,
  handleOnClick,
  ...restProp
}: TagType) {
  return (
    <S.Wrapper
      onClick={handleOnClick}
      color={color}
      bgcolor={bgColor}
      padding={padding}
    >
      <Tag
        closable
        onClose={() => {
          if (onRemove && nameSpace !== 'clearAll') {
            onRemove(nameSpace);
          } else if (onRemoveAll) {
            onRemoveAll();
          }
        }}
        bordered={bordered}
        {...restProp}
      >
        <span className="tag-text">{content}</span>
      </Tag>
    </S.Wrapper>
  );
}

export default TagCustom;
