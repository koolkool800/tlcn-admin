import { matchPath, useLocation } from 'react-router-dom';

export type Route = {
  label: string;
  icon: JSX.Element | null;
  route: string;
  routePattern: string[];
};

const usePatternCurrentPath = (routes: Route[]) => {
  const { pathname } = useLocation();
  try {
    return routes.find((value) => {
      const routeMatch = value.routePattern.find((route: string) =>
        matchPath(route, pathname)
      );
      return routeMatch;
    });
  } catch (err) {
    /* empty */
  }
  return null;
};

export default usePatternCurrentPath;
