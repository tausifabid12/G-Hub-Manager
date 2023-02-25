import { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Layout from '@/components/Layout/Layout';
import { BsFillPencilFill } from 'react-icons/bs';
import UpDateStatus from '@/components/UpDateStatus/UpDateStatus';
import CreateRepo from '@/components/CreateRepo/CreateRepo';
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';

const GET_PROFILEINFO = gql`
  query getProfileINfo {
    user(login: "tausifabid12") {
      status {
        message
      }
    }
  }
`;

const Mutation = () => {
  const { loading: statusLoading, data: statusData } =
    useQuery(GET_PROFILEINFO);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || user) {
      console.log('logged In');
    } else {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return null;
  }

  if (statusLoading) {
    return <Loading />;
  }
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
        <CreateRepo />
        <UpDateStatus />
      </div>
    </Layout>
  );
};

export default Mutation;
