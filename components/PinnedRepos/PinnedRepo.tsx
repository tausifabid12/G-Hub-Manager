import { gql, useQuery } from '@apollo/client';
import { isConstValueNode } from 'graphql';
import React from 'react';
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

  if (error) {
    console.log(error);
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
          pinnedRepos.map((repo) => (
            <PinnedRepoCard
              key={repo.node.id}
              data={repo.node}
              profileData={profileData}
            />
          ))}
      </div>
    </section>
  );
};

export default PinnedRepo;