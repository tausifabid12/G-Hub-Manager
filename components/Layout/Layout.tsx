import React from 'react';
import SideBarProfile from '../SideBarProfile/SideBarProfile';

interface LPROPS{
    children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<LPROPS> = ({children}) => {
    return (
        <div className="drawer drawer-mobile bg-white">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* <!-- Page content here --> */}
          {children}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-1 w-64 bg-secondary text-white shadow-lg ">
            {/* <!-- Sidebar content here --> */}
            <li><SideBarProfile/></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        
        </div>
      </div>
    );
};

export default Layout;