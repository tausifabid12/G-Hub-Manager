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

  const handleRepoCreation = (e: any): void => {
    e.preventDefault();
    updateStatus({
      variables: {
        input: {
          name: repoName,
          visibility: privacy,
        },
      },
    });

    if (data?.createRepository?.repository?.name) {
      toast.success('Repository Successfully created!');
    }
  };

  // Doing Mutation
  const [updateStatus, { data, loading }] = useMutation(CREATE_REOP);

  return (
    <section className="mx-4 lg:mx-10 my-8 h-full shadow-lg rounded-xl py-6 px-6 border-t-4 border-secondary space-y-5">
      <h1 className="text-3xl font-bold text-secondary mb-9">
        Create New Repository
      </h1>
      <div className="">
        <form onSubmit={handleRepoCreation} className="space-y-6 px-5">
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
          <button type="submit" className="btn btn-primary w-full">
            {loading ? 'Creating...' : 'Create'}
          </button>
          <div
            className={`space-y-3 ${
              data ? 'flex' : 'hidden'
            } pt-3 items-center justify-between`}
          >
            <p className="text-xl text-secondary font-semibold">
              Created Repo: {data?.createRepository?.repository?.name}{' '}
            </p>
            <a
              href={data?.createRepository?.repository?.url}
              className="btn btn-sm btn-primary   font-semibold hover:underline"
            >
              Visit
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateRepo;
