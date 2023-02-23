import Layout from '@/components/Layout/Layout';
import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const GET_REPOSITORY = gql`
  query Repository($repoName: String!) {
    repository(name: $repoName, owner: "tausifabid12") {
      id
      name
      homepageUrl
      description
      createdAt
      isPrivate
      sshUrl
      url
    }
  }
`;

const RepoDetails: React.FC = () => {
  const { query } = useRouter();
  const repoName = query.repoDetails;

  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repoName },
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <p>loading</p>;
  }

  const { name, url, isPrivate, sshUrl, createdAt, description, homepageUrl } =
    data?.repository;

  return (
    <Layout>
      <section className="rounded-xl bg-white p-4 ring mx-20 my-16 ring-indigo-50 sm:p-6 lg:p-8">
        <div className="flex items-start sm:gap-8 ">
          <div
            className="hidden sm:grid sm:h-20 sm:w-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-primary"
            aria-hidden="true"
          >
            <div className="flex items-center gap-1">
              <span className="h-8 w-0.5 rounded-full bg-primary"></span>
              <span className="h-6 w-0.5 rounded-full bg-primary"></span>
              <span className="h-4 w-0.5 rounded-full bg-primary"></span>
              <span className="h-6 w-0.5 rounded-full bg-primary"></span>
              <span className="h-8 w-0.5 rounded-full bg-primary"></span>
            </div>
          </div>

          <div className="relative">
            <div className="mt-1 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>

                <p className="text-sm font-medium">{createdAt.slice(0, 10)}</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>
            </div>
            <strong className="absolute right-5 rounded border border-primary bg-primary px-3 py-1.5 text-xs text-white ">
              {isPrivate ? 'Private Repository' : 'Public Repository'}
            </strong>

            <h3 className="mt-4 text-lg lg:text-2xl font-bold uppercase ">
              {name}
            </h3>

            <p className="mt-4 text-md font-semibold text-gray-700">
              {description
                ? description
                : 'NO Description Is Available For This Repository'}
            </p>
            <p className="mt-2 text-md font-semibold text-gray-700">
              Clone This Repo: {sshUrl}
            </p>
            <div className="space-x-12 mt-8">
              <Link
                href={url}
                className="mt-1 text-md font-semibold text-primary hover:underline"
              >
                Code Link
              </Link>
              <Link
                href={homepageUrl}
                className="mt-1 text-md font-semibold text-primary hover:underline"
              >
                live Link
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RepoDetails;
