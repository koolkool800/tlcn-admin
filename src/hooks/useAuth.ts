import { RootState } from '@redux/store';
import { Auth } from 'interface';
import { useAppSelector } from './useAppSelector';

const useAuth = (): Auth => {
  return useAppSelector((state: RootState) => state.authReducer);
};

export default useAuth;
