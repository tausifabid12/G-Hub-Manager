import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface INFOPROPS {
  cardData: {
    name: string;
    value: number | string;
    icon: JSX.Element[] | JSX.Element;
  };
}

const InfoCard: React.FC<INFOPROPS> = ({ cardData }) => {
  return (
    <div className="shadow-lg border-t-4 border-secondary  space-y-4 w-full rounded-lg p-4">
      <div className="bg-secondary flex items-center justify-between text-white font-bold rounded-md p-2 text-xl">
        <span>{cardData?.icon}</span>
        <span>
          <BsThreeDotsVertical />
        </span>
      </div>
      <div>
        <h6 className="text-lg text-gray-700 font-bold">{cardData?.name}</h6>
        <h2 className="text-secondary font-bold text-4xl ">
          {cardData?.value}
        </h2>
      </div>
    </div>
  );
};

export default InfoCard;
