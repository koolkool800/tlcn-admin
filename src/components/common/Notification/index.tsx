import { NotificationBing } from 'iconsax-react';
import { useEffect } from 'react';
import * as S from './style';
import { socket } from '../../../socket';

const Notification = () => {
  // useEffect(() => {
  //   function onConnect() {
  //     console.log('onConnect');
  //   }

  //   function onDisconnect() {
  //     console.log('disConnect');
  //   }
  //   socket.on('hihiEvent', onConnect);
  //   socket.on('disconnect', onDisconnect);
  // }, []);
  return (
    <S.Wrapper>
      <NotificationBing size="20" />
    </S.Wrapper>
  );
};

export default Notification;
