import React from 'react';
import { BsPinFill, BsThreeDotsVertical } from "react-icons/bs";

const InfoCard = () => {
    return (
        <div className='shadow-lg border-t-4 border-secondary  space-y-4 w-full rounded-lg p-4'>
            <div className='bg-secondary flex items-center justify-between text-white font-bold rounded-md p-2 text-xl'>
                <span><BsPinFill/></span>
                <span><BsThreeDotsVertical/></span>
                </div>
            <div>
                <h6 className='text-lg text-gray-700 font-bold'>Pinned Repo</h6>
                <h2 className='text-secondary font-bold text-4xl '>06</h2>

            </div>
        </div>
    );
};

export default InfoCard;