import Layout from '@/components/Layout/Layout';
import Loading from '@/components/Loading/Loading';
import PinnedRepoCard from '@/components/PinnedRepoCard/PinnedRepoCard';
import RepositoriesCard from '@/components/RepositoriesCard/RepositoriesCard';
import { useAuth } from '@/contexts/AuthProvider';
import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface RPOPROPS {
  data: {
    user: {
      repositories: { edges: [] };
      avatarUrl: string;
      name: string;
      login: string;
    };
  };
}

const Repositories: React.FC<RPOPROPS> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(8);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return null;
  }

  const repos = data?.user?.repositories?.edges;

  const pages = Math.ceil(repos?.length / size);

  const lastPageIndex = currentPage * size;
  const firstPageIndex = lastPageIndex - size;

  const pagedData = repos?.slice(firstPageIndex, lastPageIndex);

  const profileData = {
    name: data?.user?.login,
    avatarUrl: data?.user?.avatarUrl,
  };
  return (
    <Layout>
      <section className="px-8 py-8 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-5xl text-secondary font-bold">
            Repositories
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <p className="font-semibold text-lg">View :</p>
            <div className="form-control ">
              <select
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="select select-sm select-bordered"
              >
                <option>4</option>
                <option selected>8</option>
                <option>12</option>
                <option>16</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {pagedData?.map(
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
        <div className=" flex justify-center pb-9">
          {pages &&
            [...Array(pages).keys()].map((num) => (
              <button
                onClick={() => setCurrentPage(num + 1)}
                className="px-3 py-1 mr-3 text-secondary font-semibold shadow-lg border border-gray-200 rounded-lg"
                key={num}
              >
                {num + 1}
              </button>
            ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        user(login: "tausifabid12") {
          repositories(
            last: 40
            orderBy: { field: CREATED_AT, direction: DESC }
          ) {
            edges {
              node {
                id
                name
                createdAt
                description
                homepageUrl
                url
              }
            }
          }
          login
          name
          avatarUrl(size: 500)
        }
      }
    `,
  });

  return {
    props: { data: data },
  };
}

export default Repositories;
