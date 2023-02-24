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
    <div className="shadow-lg border-t-4 border-secondary  space-y-4 w-full rounded-lg py-4 px-2 lg:p-4">
      <div className="bg-secondary flex items-center justify-between text-white font-bold rounded-md p-1 lg:p-2 text-xl">
        <span>{cardData?.icon}</span>
        <span>
          <BsThreeDotsVertical />
        </span>
      </div>
      <div>
        <h6 className="text-md lg:text-lg text-gray-700 font-bold">
          {cardData?.name}
        </h6>
        <h2 className="text-secondary font-bold text-xl lg:text-4xl ">
          {cardData?.value}
        </h2>
      </div>
    </div>
  );
};

export default InfoCard;
