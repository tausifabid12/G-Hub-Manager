import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsFillXCircleFill } from 'react-icons/bs';
import PinnedRepoCard from '../PinnedRepoCard/PinnedRepoCard';
import Link from 'next/link';
import Loading from '../Loading/Loading';
import SearchCard from '../SearchCard/SearchCard';

const GET_PROFILEINFO = gql`
  query getProfileINfo {
    user(login: "tausifabid12") {
      avatarUrl(size: 500)
      login
      name
    }
  }
`;

const SEARCH_REPOSITORIES = gql`
  query searchRepositories($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
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
  }
`;

const Profile: React.FC = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { loading: searchLoading, data: searchData } = useQuery(
    SEARCH_REPOSITORIES,
    {
      variables: { query: searchQuery, first: 4 },
    }
  );

  const { loading, error, data } = useQuery(GET_PROFILEINFO);

  if (loading) {
    return <Loading />;
  }

  const profileData = {
    name: data?.user?.login,
    avatarUrl: data?.user?.avatarUrl,
  };

  console.log(searchData?.search?.edges, 'this is');

  const handleSearch = (event: any) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div
        className={`hidden  lg:flex flex-wrap items-center space-x-7 w-full  ${
          isSearch ? 'p-0' : 'p-10'
        } shadow-sm text-gray-100 `}
      >
        <Image
          width={500}
          height={500}
          src={data?.user.avatarUrl}
          alt=""
          className="w-16 h-16   lg:w-24 lg:h-24 rounded-full bg-gray-500 aspect-square mx-auto lg:mx-0"
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
                    onChange={handleSearch}
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-[70%] mx-auto">
                      <div
                        className={`${
                          searchLoading ? 'flex' : 'hidden'
                        } col-span-3  justify-center items-center h-32`}
                      >
                        <h1 className="text-primary font-bold text-2xl">
                          Loading.........
                        </h1>
                      </div>

                      {searchData?.search?.edges &&
                        searchData?.search?.edges.map((item: any) => (
                          <SearchCard
                            key={item?.node?.id}
                            data={item?.node}
                            profileData={profileData}
                          />
                        ))}

                      {/* {searchData?.search?.edges && (
                        <PinnedRepoCard
                          data={searchData?.repository}
                          profileData={profileData}
                        />
                      )} */}
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
