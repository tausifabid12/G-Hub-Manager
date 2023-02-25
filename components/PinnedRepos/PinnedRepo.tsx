import { gql, useQuery } from '@apollo/client';
import { isConstValueNode } from 'graphql';
import React from 'react';
import Loading from '../Loading/Loading';
import PinnedRepoCard from '../PinnedRepoCard/PinnedRepoCard';

const GET_REPOINFO = gql`
  query getRepoInfo {
    user(login: "tausifabid12") {
      pinnedItems(first: 10) {
        edges {
          node {
            ... on Repository {
              id
              name
              createdAt
              description
              homepageUrl
              url
            }
          }
        }
      }
      login
      name
      avatarUrl(size: 500)
    }
  }
`;

const PinnedRepo: React.FC = () => {
  const { loading, error, data } = useQuery(GET_REPOINFO);

  if (loading) {
    return <Loading />;
  }

  const profileData = {
    name: data?.user?.login,
    avatarUrl: data?.user?.avatarUrl,
  };

  const pinnedRepos = data?.user?.pinnedItems.edges;

  return (
    <section className="p-6">
      <h1 className="text-4xl font-bold text-secondary pb-8">Pinned Repos</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-8">
        {pinnedRepos &&
          pinnedRepos.map(
            (repo: {
              node: {
                id?: string | undefined;
                url?: string | undefined;
                name: string;
                homepageUrl?: string | undefined;
                description?: string | undefined;
                createdAt: string;
              };
            }) => (
              <PinnedRepoCard
                key={repo.node.id}
                data={repo.node}
                profileData={profileData}
              />
            )
          )}
      </div>
    </section>
  );
};

export default PinnedRepo;
