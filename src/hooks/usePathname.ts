import { useLocation } from 'react-router-dom';

// custom hook to get the current pathname
const usePathname = (): string => {
  const location = useLocation();
  return location.pathname.replace('/', '');
};
export default usePathname;
