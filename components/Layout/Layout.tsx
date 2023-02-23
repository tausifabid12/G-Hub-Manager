import client from '@/utilities/ApolloClientConnection/ApolloClientConnection';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import React from 'react';
import { BsGithub } from 'react-icons/bs';

interface LPROPS {
  children: JSX.Element[] | JSX.Element;
}

// const GET_PROFILEINFO = gql`
//   query GetProfileInfo {
//     user(login: "tausifabid12") {
//       avatarUrl(size: 500)
//       name
//       login
//     }
//   }
// `;

const QUERY = gql`
  query Countries {
    user(login: "tausifabid12") {
      avatarUrl(size: 500)
      name
      login
    }
  }
`;

const Layout: React.FC<LPROPS> = ({ children }) => {
  const { data } = useQuery(QUERY);

  console.log(data, 'data');

  return (
    <div className="drawer drawer-mobile bg-white">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* <!-- Page content here --> */}
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-1 w-64 bg-secondary text-white shadow-lg ">
          {/* <!-- Sidebar content here --> */}
          <li>{/* <SideBarProfile data={data?.user} /> */}</li>
          <li className="text-lg lg:text-2xl mb-10 font-bold uppercase">
            <Link href="/">
              <p className="text-5xl text-primary mx-auto ">
                <BsGithub />
              </p>
            </Link>
            <Link href="/">
              <p>
                G-Hub <span className="text-primary"> Manager</span>
              </p>
            </Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/repositories">Repositories</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
