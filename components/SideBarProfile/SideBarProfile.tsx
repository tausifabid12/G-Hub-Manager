import Image from 'next/image';
import React from 'react';

interface LPROPS {
  data: {
    avatarUrl: string;
    login: string;
    name: string;
  };
}

const SideBarProfile: React.FC<LPROPS> = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col justify-center w-full  shadow-md rounded-xl  text-gray-100">
      <Image
        width={500}
        height={500}
        src={data.avatarUrl}
        alt=""
        className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-lg font-semibold ">{data?.name}</h2>
          <p className="px-5 text-sm  text-gray-400">{data?.login}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SideBarProfile;
