import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCodeSlash } from 'react-icons/bs';

interface IPROPS {
  data: {
    id: string;
    url: string;
    name: string;
    homepageUrl?: string;
    description?: string;
    createdAt: string;
  };
}

const PinnedRepoCard: React.FC<IPROPS> = ({ data, profileData }) => {
  const { url, name, id, homepageUrl, description, createdAt } = data;

  return (
    <div className="max-w-2xl px-8 py-4 bg-white border-t-4 border-secondary rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 font-semibold dark:text-gray-400">
          {createdAt.slice(0, 10)}
        </span>
        <a
          className="px-3 py-1 text-sm flex items-center font-bold text-white transition-colors duration-300 transform bg-secondary rounded cursor-pointer hover:bg-gray-500"
          role="button"
        >
          <span className="text-lg mr-1">
            <BsCodeSlash />
          </span>
          Code
        </a>
      </div>

      <div className="mt-2">
        <a
          href="#"
          className="text-xl font-bold text-secondary dark:text-white hover:text-secondary dark:hover:text-gray-200 hover:underline "
          role="link"
        >
          <p className="capitalize">{name}</p>
        </a>
        <p className="mt-2 text-md text-gray-700 font-semibold dark:text-gray-300 truncate">
          {description
            ? description
            : 'No Description Available For This Pinned Repository'}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Link
          href={`/repoDetails/${name}`}
          className="text-primary font-semibold hover:underline"
          role="link"
        >
          View Details
        </Link>

        <div className="flex items-center">
          <Image
            width={500}
            height={500}
            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            src={profileData?.avatarUrl}
            alt="avatar"
          />
          <a
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            role="link"
          >
            {profileData?.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PinnedRepoCard;
