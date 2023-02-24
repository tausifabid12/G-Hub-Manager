import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Layout from '@/components/Layout/Layout';
import { BsFillPencilFill } from 'react-icons/bs';
import StatusModal from '@/components/StatusModal/StatusModal';
import UpDateStatus from '@/components/UpDateStatus/UpDateStatus';
import CreateRepo from '@/components/CreateRepo/CreateRepo';

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

  console.log(statusData, 'kkkk');
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <CreateRepo />
        <UpDateStatus />
      </div>
    </Layout>
  );
};

export default Mutation;
