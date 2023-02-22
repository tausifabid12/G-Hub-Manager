import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import React from 'react';
import { BsPinFill, BsThreeDotsVertical, BsStack } from 'react-icons/bs';
import InfoCard from '../InfoCard/InfoCard';

interface INFOPROPS {
  data: {
    pinnedItems: { totalCount: number };
    repositories: {};
    watching: {};
  };
}

const TopInfoSection: React.FC<INFOPROPS> = ({ data }) => {
  console.log(data?.pinnedItems.totalCount);

  const cardInfo = [
    {
      id: 1,
      name: 'Pinned Repo',
      icon: <BsPinFill />,
      value: 4,
    },
    {
      id: 2,
      name: 'Pinned Repo',
      icon: <BsPinFill />,
      value: 4,
    },
    {
      id: 3,
      name: 'Pinned Repo',
      icon: <BsPinFill />,
      value: 4,
    },
    {
      id: 4,
      name: 'Pinned Repo',
      icon: <BsPinFill />,
      value: 4,
    },
  ];
  return (
    <section className="grid grid-cols-4 gap-5 px-5 py-10">
      <InfoCard />
      <InfoCard />
      <InfoCard />
    </section>
  );
};

export default TopInfoSection;
