import { useRouter } from 'next/router';
import React from 'react';

const ViewContactPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>ViewContactPage {id}</div>;
};

export default ViewContactPage;
