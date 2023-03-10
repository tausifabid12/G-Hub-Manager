import React from 'react';

interface IPROPS {
  data: {
    id?: string;
    url?: string;
    name: string;
    homepageUrl?: string;
    description?: string;
    createdAt: string;
  };
  profileData: {
    name: string;
    avatarUrl: string;
  };
}

const SearchCard: React.FC<IPROPS> = ({ data }) => {
  const { url, name, id, homepageUrl, description, createdAt } = data;
  return (
    <div className="w-full h-32 bg-white rounded-md p-5 border-t-4 border-secondary ">
      <h2 className="text-gray-700 text-xl font-bold uppercase pb-3">{name}</h2>
      <a href={url} className="text-primary font-bold hover:underline">
        Visit
      </a>
    </div>
  );
};

export default SearchCard;
