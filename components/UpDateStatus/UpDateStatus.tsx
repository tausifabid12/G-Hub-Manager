import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BsFillPencilFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

const GET_PROFILEINFO = gql`
  query getProfileINfo {
    user(login: "tausifabid12") {
      status {
        message
      }
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateStatus($input: ChangeUserStatusInput!) {
    changeUserStatus(input: $input) {
      clientMutationId
      status {
        message
        updatedAt
      }
    }
  }
`;

const UpDateStatus: React.FC = () => {
  const [statusText, setStatusText] = useState('');

  // Doing Mutation
  const [updateStatus, { data, loading, error }] = useMutation(UPDATE_STATUS);

  //Getting Previous  Status
  const {
    loading: statusLoading,
    data: statusData,
    refetch,
  } = useQuery(GET_PROFILEINFO);

  //
  const updatedStatus = data?.changeUserStatus?.status?.message;

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    updateStatus({
      variables: {
        input: {
          message: statusText,
        },
      },
    });

    if (loading || updatedStatus) {
      refetch();

      toast.success('Successfully Updated!');
    }
  };

  return (
    <section>
      <div className="mx-4 lg:mx-10 my-8 h-full shadow-lg rounded-xl p-6 border-t-4 border-secondary space-y-5">
        <h1 className="text-3xl font-bold text-secondary">Update New Status</h1>
        <div className="flex items-center space-x-8">
          <p className="text-lg font-semibold">
            Status:{' '}
            {loading
              ? 'Updating....'
              : updatedStatus
              ? updatedStatus
              : statusData?.user?.status?.message}
          </p>

          <label
            htmlFor="StatusModal"
            className="bg-primary p-[6px] rounded-full cursor-pointer"
          >
            <BsFillPencilFill className="text-white" />
          </label>
        </div>
      </div>

      {/* modal  */}
      <div>
        <input type="checkbox" id="StatusModal" className="modal-toggle" />
        <div className="modal bg-black/30 backdrop-blur-sm">
          <div className="modal-box relative bg-white">
            <label
              htmlFor="StatusModal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <h1 className="text-2xl font-bold pb-5">Update Your Status</h1>
              <form onSubmit={handleSubmit} className="form-control space-y-4">
                <label className="label">
                  <span className="text-secondary font-semibold">
                    Write Your Status
                  </span>
                </label>
                <textarea
                  onChange={(e) => setStatusText(e.target.value)}
                  className="textarea textarea-bordered h-24"
                  placeholder="Your Status..."
                ></textarea>
                <button className="btn btn-secondary text-white">
                  {loading ? 'Updating....' : 'Update'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpDateStatus;
