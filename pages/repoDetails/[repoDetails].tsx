import Layout from '@/components/Layout/Layout';
import Loading from '@/components/Loading/Loading';
import { useAuth } from '@/contexts/AuthProvider';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
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

  const { loading: dataLoading, data } = useQuery(GET_REPOSITORY, {
    variables: { repoName },
  });

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

  if (dataLoading) {
    return <Loading />;
  }

  const { name, url, isPrivate, sshUrl, createdAt, description, homepageUrl } =
    data?.repository;

  return (
    <Layout>
      <section className="rounded-xl bg-white p-4 ring lg:mx-20 mx-2 my-16 ring-indigo-50 sm:p-6 lg:p-8">
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

          <div className="relative w-full">
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
                    strokeLinecap="round"
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
            <strong className="hidden lg:absolute right-5 rounded border border-primary bg-primary px-3 py-1.5 text-xs text-white ">
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
              <a
                href={url}
                className="mt-1 text-md font-semibold text-primary hover:underline"
              >
                Code Link
              </a>
              {homepageUrl && (
                <a
                  href={homepageUrl}
                  className="mt-1 text-md font-semibold text-primary hover:underline"
                >
                  live Link
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RepoDetails;
