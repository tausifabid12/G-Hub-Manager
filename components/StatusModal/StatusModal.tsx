import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ADD_TODO = gql`
  mutation AddTodo($input: ChangeUserStatusInput!) {
    changeUserStatus(input: $input) {
      clientMutationId
      status {
        message
        updatedAt
      }
    }
  }
`;

const StatusModal: React.FC = () => {
  const [statusText, setStatusText] = useState('');
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  console.log(data);

  return (
    <div>
      <input type="checkbox" id="StatusModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="StatusModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div>
            <h1 className="text-2xl font-bold pb-5">Update Your Status</h1>
            <div className="form-control space-y-4">
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
              <button
                onClick={() => {
                  addTodo({
                    variables: {
                      input: {
                        message: statusText,
                      },
                    },
                  });
                }}
                // htmlFor="StatusModal"
                className="btn btn-secondary text-white"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
