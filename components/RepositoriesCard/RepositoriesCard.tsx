import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { gql } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

interface RPROPS {
  data: {
    name: string;
    url: string;
    homepageUrl?: string | null;
    description?: string | null;
  };
}

const RepositoriesCard: React.FC<RPROPS> = ({ data }) => {
  const { name, url, homepageUrl, description } = data;
  // console.log(data, 'new');
  return (
    <div className="w-full  p-6 h-60 rounded-xl shadow-lg space-y-3 border-t-4 border-secondary relative overflow-hidden">
      <h1 className="font-bold text-lg text-secondary">{name}</h1>
      <p className="text-gray-700 font-semibold text-sm">
        {description
          ? description.length < 80
            ? description
            : description.slice(0, 80)
          : 'NO Description Available For This Repository'}
      </p>
      <div className="w-full absolute left-0 px-5 bottom-3">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-xs btn-secondary w-full text-white "
        >
          GitHub Code
        </a>
        {/* {homepageUrl && (
          <Link
            href={homepageUrl}
            className="btn btn-xs btn-secondary text-white"
          >
            Live Url
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default RepositoriesCard;
