import { ArrowDown2 } from 'iconsax-react';
import { useState } from 'react';
import * as S from './style';

function CustomDropDown({ title, filter }: { title: string; filter: any }) {
  const [isShown, setIsShown] = useState(false);
  return (
    <S.WrapperContainer>
      <div
        className="container-box-title"
        onClick={() => {
          setIsShown(!isShown);
        }}
        aria-hidden="true"
      >
        <span>{title}</span>
        <ArrowDown2
          size="20"
          color="#FF8A65"
          style={{ transform: isShown ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </div>

      <div className={`container-box-content ${isShown ? 'shown' : ''}`}>
        {filter}
      </div>
    </S.WrapperContainer>
  );
}

export default CustomDropDown;
