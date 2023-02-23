import Layout from '@/components/Layout/Layout';
import RepositoriesCard from '@/components/RepositoriesCard/RepositoriesCard';
import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { gql } from '@apollo/client';

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
  console.log(data);

  return (
    <Layout>
      <section className="p-12 space-y-10">
        <h1 className="text-5xl text-secondary font-bold">Repositories</h1>
        <div className="grid grid-cols-4 gap-5">
          {data?.map((repo) => (
            <RepositoriesCard key={repo?.node.name} data={repo.node} />
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
