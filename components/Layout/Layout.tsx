import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { BsGithub } from 'react-icons/bs';
import Profile from '../SideBarProfile/Profile';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from 'react-hot-toast';

interface LPROPS {
  children: React.ReactNode;
}

const Layout: React.FC<LPROPS> = ({ children }) => {
  const { logOut, user } = useAuth();
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
        <div className="flex flex-col py-7 justify-between w-64 bg-secondary h-full text-white shadow-lg ">
          {/* <!-- Sidebar content here --> */}
          <div className="font-semibold  ">
            <div className="text-lg lg:text-2xl space-y-4 grid place-content-center mb-10 font-bold uppercase">
              <Link href="/" className="inline-block mx-auto ">
                <p className="text-5xl text-primary mx-auto ">
                  <BsGithub />
                </p>
              </Link>
              <Link href="/" className="hidden lg:block ">
                <p className="text-center">
                  G-Hub <span className="text-primary ">Manager</span>
                </p>
              </Link>
            </div>

            <Link
              href="/"
              className="block w-full py-3 px-3 transition-all duration-150 hover:border-l-4 border-primary  hover:bg-gradient-to-r from-primary/30 to-primary/10 "
            >
              Home
            </Link>

            <Link
              href="/repositories"
              className="block w-full py-3 px-3 transition-all duration-150 hover:border-l-4 border-primary  hover:bg-gradient-to-r from-primary/30 to-primary/10"
            >
              Repositories
            </Link>

            <Link
              href="/mutation"
              className="block w-full py-3 px-3 transition-all duration-150 hover:border-l-4 border-primary  hover:bg-gradient-to-r from-primary/30 to-primary/10"
            >
              Mutation
            </Link>
          </div>

          <div className="px-5">
            {user && user?.uid && (
              <button
                onClick={() => {
                  logOut();
                  toast.success('logged Out');
                }}
                className="bg-primary py-2 rounded-lg text-white  w-full "
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
