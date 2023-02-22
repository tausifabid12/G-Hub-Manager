import React from 'react';
import {
  BsPinFill,
  BsThreeDotsVertical,
  BsStack,
  BsEyeFill,
  BsEjectFill,
} from 'react-icons/bs';
import InfoCard from '../InfoCard/InfoCard';

interface INFOPROPS {
  data: {
    pinnedItems: { totalCount: number };
    repositories: { totalCount: number; totalDiskUsage: number };
    watching: { totalCount: number };
  };
}

const TopInfoSection: React.FC<INFOPROPS> = ({ data }) => {
  const cardInfo = [
    {
      id: 1,
      name: 'Pinned Repository',
      icon: <BsPinFill />,
      value: `0${data?.pinnedItems.totalCount}`,
    },
    {
      id: 2,
      name: 'Total Repository',
      icon: <BsStack />,
      value: data?.repositories.totalCount,
    },
    {
      id: 3,
      name: 'Disk Usage',
      icon: <BsEjectFill />,
      value: `${Math.round(data?.repositories.totalDiskUsage / 1000)}`,
    },
    {
      id: 4,
      name: 'Total Watching',
      icon: <BsEyeFill />,
      value: data?.watching.totalCount,
    },
  ];
  return (
    <section className="grid grid-cols-4 gap-5 px-5 py-10">
      {cardInfo.map((card) => (
        <InfoCard key={card.id} cardData={card} />
      ))}
    </section>
  );
};

export default TopInfoSection;
