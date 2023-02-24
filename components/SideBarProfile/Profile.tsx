import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsFillXCircleFill } from 'react-icons/bs';
import PinnedRepoCard from '../PinnedRepoCard/PinnedRepoCard';

const GET_PROFILEINFO = gql`
  query getProfileINfo {
    user(login: "tausifabid12") {
      avatarUrl(size: 500)
      login
      name
    }
  }
`;

const GET_REPOSITORY = gql`
  query Repository($repoName: String!) {
    repository(name: $repoName, owner: "tausifabid12") {
      id
      name
      createdAt
      description
      homepageUrl
      url
    }
  }
`;

const Profile: React.FC = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchRepoName, setSearchRepoName] = useState('');

  const { loading, error, data } = useQuery(GET_PROFILEINFO);
  const { data: searchData } = useQuery(GET_REPOSITORY, {
    variables: { repoName: searchRepoName },
  });

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <p>loading</p>;
  }

  const profileData = {
    name: data?.user?.login,
    avatarUrl: data?.user?.avatarUrl,
  };

  console.log(searchData?.repository);

  return (
    <div>
      <div
        className={`flex flex-wrap items-center space-x-7 w-full  ${
          isSearch ? 'p-0' : 'p-10'
        } shadow-sm text-gray-100 `}
      >
        <Image
          width={500}
          height={500}
          src={data?.user.avatarUrl}
          alt=""
          className="w-24 h-24 rounded-full bg-gray-500 aspect-square mx-auto lg:mx-0"
        />
        <div className="space-y-4 mt-4 flex-grow lg:mt-0 text-center text-secondary mx-auto lg:mx-0 relative">
          <div className="flex items-center justify-between w-full  ">
            <div className="my-2 space-y-1">
              <h2 className="text-xl lg:text-4xl font-bold ">
                {data?.user.name}
              </h2>
              <p className="text-sm lg:text-lg  lg:text-left font-semibold text-gray-600  ">
                {data?.user?.login}
              </p>
            </div>
            <div>
              <motion.div
                animate={{
                  width: !isSearch ? 300 : 1200,
                  height: !isSearch ? 50 : 1000,
                }}
                className={`form-control ${
                  isSearch
                    ? 'bg-black/30 -top-1 right-0'
                    : 'bg-transparent right-0  top-2'
                }   backdrop-blur-sm absolute  z-50 `}
              >
                <div className="relative">
                  <input
                    onFocus={() => setIsSearch(true)}
                    onChange={(e) => setSearchRepoName(e.target.value)}
                    type="text"
                    placeholder="Search by repository name.."
                    className={`input input-bordered  ${
                      isSearch ? 'mt-24 w-[500px]' : 'mt-0 w-[300px]'
                    } mx-auto`}
                  />
                  <span
                    className={`${
                      isSearch ? 'absolute' : 'hidden'
                    } top-6 right-6`}
                  >
                    <BsFillXCircleFill
                      onClick={() => setIsSearch(false)}
                      className="text-3xl text-secondary cursor-pointer "
                    />
                  </span>

                  <div
                    className={`w-full mt-24 ${isSearch ? 'block' : 'hidden'}`}
                  >
                    <div className="mx-auto inline-block ">
                      {searchData?.repository && (
                        <PinnedRepoCard
                          data={searchData?.repository}
                          profileData={profileData}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
