import useAuth from '@hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  redirectPath?: string;
}

export const PrivateRoutes = ({ redirectPath = '/login' }: Props) => {
  const { accessToken } = useAuth();
  return accessToken ? <Outlet /> : <Navigate to={redirectPath} replace />;
};
