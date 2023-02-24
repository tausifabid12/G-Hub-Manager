import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { BsGithub } from 'react-icons/bs';
import Profile from '../SideBarProfile/Profile';
import { FaBars } from 'react-icons/fa';

interface LPROPS {
  children: React.ReactNode;
}

const Layout: React.FC<LPROPS> = ({ children }) => {
  return (
    <div className="drawer drawer-mobile bg-white">
      <input id="sideBar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* <!-- Page content here --> */}
        {/* sm screen Navigating */}
        <div className="py-4 px-5 shadow-md  flex lg:hidden items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            G-Hub <span className="text-primary"> Manager</span>
          </Link>
          <label htmlFor="sideBar" className=" drawer-button lg:hidden">
            <FaBars />
          </label>
        </div>
        <Profile />
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="sideBar" className="drawer-overlay"></label>
        <ul className="menu p-1 w-64 bg-secondary text-white shadow-lg ">
          {/* <!-- Sidebar content here --> */}
          <li className="text-lg lg:text-2xl mb-10 font-bold uppercase">
            <Link href="/">
              <p className="text-5xl text-primary mx-auto ">
                <BsGithub />
              </p>
            </Link>
            <Link href="/" className="hidden lg:block ">
              <p className="text-center">
                G-Hub <span className="text-primary ">Manager</span>
              </p>
            </Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/repositories">Repositories</Link>
          </li>
          <li>
            <Link href="/mutation">Mutation</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
