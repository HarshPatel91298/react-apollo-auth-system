import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const VERIFY_QUERY = gql`
  query VerifyToken {
    verifyToken {
      status
      error
    }
  }
`;

function useVerifyUser() {
  const { data, loading, error } = useQuery(VERIFY_QUERY);
  const [result, setResult] = useState({ status: false, error: null });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      setResult({ status: false, error: error.message });
      return;
    }

    if (data) {
      const { status, error: verifyError } = data.verifyToken;
      setResult({ status, error: verifyError });
    }
  }, [data, loading, error]);

  return result;
}

export default useVerifyUser;
