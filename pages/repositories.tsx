import Layout from '@/components/Layout/Layout';
import RepositoriesCard from '@/components/RepositoriesCard/RepositoriesCard';
import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { gql } from '@apollo/client';
import { useState } from 'react';

interface RPOPROPS {
  data: [
    {
      node: {
        name: string;
        url: string;
        homepageUrl?: string;
        description?: string;
      };
    }
  ];
}

const Repositories: React.FC<RPOPROPS> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(8);
  console.log(data);

  const pages = Math.ceil(data?.length / size);

  const lastPageIndex = currentPage * size;
  const firstPageIndex = lastPageIndex - size;

  const pagedData = data?.slice(firstPageIndex, lastPageIndex);

  return (
    <Layout>
      <section className="px-12 py-8 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-secondary font-bold">Repositories</h1>
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

        <div className="grid grid-cols-4 gap-5">
          {pagedData?.map((repo) => (
            <RepositoriesCard key={repo?.node.name} data={repo.node} />
          ))}
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
                name
                url
                description
                homepageUrl
              }
            }
          }
        }
      }
    `,
  });

  console.log(data?.user?.repositories?.edges);

  return {
    props: { data: data.user.repositories.edges },
  };
}

export default Repositories;
