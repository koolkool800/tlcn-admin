import { USER, getLocalStorage } from '@utils/localStorage';
import { UserType } from 'interface';

const useUser = () => {
  const user = getLocalStorage(USER) as UserType;
  return user;
};

export default useUser;
