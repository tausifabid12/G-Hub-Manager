import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

const CREATE_REOP = gql`
  mutation createRepo($input: CreateRepositoryInput!) {
    createRepository(input: $input) {
      repository {
        name
        url
      }
    }
  }
`;

const CreateRepo: React.FC = () => {
  const [repoName, setRepoName] = useState('');
  const [privacy, setPrivacy] = useState('PUBLIC');

  // Doing Mutation
  const [updateStatus, { data, loading, error }] = useMutation(CREATE_REOP);

  console.log(data?.createRepository?.repository?.name);

  return (
    <section className="mx-10 my-8 h-full shadow-lg rounded-xl py-10 px-6 border-t-4 border-secondary space-y-5">
      <h1 className="text-3xl font-bold text-secondary mb-9">
        Create New Repository
      </h1>
      <div className="">
        <div className="space-y-6 px-5">
          <input
            type="text"
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="Enter Repository Name"
            className="input input-bordered w-full bg-white"
            required
          />
          <select
            onChange={(e) => setPrivacy(e.target.value)}
            className="select select-bordered w-full bg-white"
            required
          >
            <option selected>PUBLIC</option>
            <option>PRIVATE</option>
          </select>
          <button
            onClick={() => {
              updateStatus({
                variables: {
                  input: {
                    name: repoName,
                    visibility: privacy,
                  },
                },
              });

              toast.success('Repository Successfully created!');
            }}
            className="btn btn-primary w-full"
          >
            Create
          </button>
        </div>

        {/* <div className="border-l border-gray-400 p-6">
          <div></div>
          <p className="text-xl font-semibold text-secondary">
            Repository Name: {data?.createRepository?.repository?.name}
          </p>
          <a href={data?.createRepository?.repository?.url}>Visit Repository</a>
        </div> */}
      </div>
    </section>
  );
};

export default CreateRepo;
