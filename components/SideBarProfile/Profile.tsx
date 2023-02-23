import Image from 'next/image';
import React from 'react';

interface LPROPS {
  data: {
    avatarUrl: string;
    login: string;
    name: string;
  };
}

const Profile: React.FC<LPROPS> = ({ data }) => {
  return (
    <div className="flex items-center space-x-7 w-full p-10  shadow-sm text-gray-100">
      <Image
        width={500}
        height={500}
        src={data.avatarUrl}
        alt=""
        className="w-24 h-24 rounded-full bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center text-secondary ">
        <div className="my-2 space-y-1">
          <h2 className="text-4xl font-bold ">{data?.name}</h2>
          <p className="text-md text-left font-semibold text-gray-600  ">
            {data?.login}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
