import { ObjectLiteral } from 'interface/general';
import { useSearchParams } from 'react-router-dom';

function useParam() {
  const [searchParams] = useSearchParams();
  const paramUrl: ObjectLiteral = Object.fromEntries([...searchParams]);
  return paramUrl;
}

export default useParam;
