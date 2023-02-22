import Image from 'next/image';
import React from 'react';

const SideBarProfile: React.FC = () => {
    return (
        <div className="flex flex-col justify-center w-full  shadow-md rounded-xl  text-gray-100">
        <Image width={500} height={500} src="/assets/user.jpg" alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square" />
        <div className="space-y-4 text-center divide-y divide-gray-700">
            <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">Leroy Jenkins</h2>
                <p className="px-5 text-xs sm:text-base text-gray-400">example@bool.com</p>
            </div>
            <div></div>
        </div>
    </div>
    );
};

export default SideBarProfile;