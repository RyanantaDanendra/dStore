// Pages/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ auth, children }) => {
    return (
        <>
            <Navbar auth={auth}/>
            <div className="content">
                {children}
            </div>
        </>
    );
}

export default Layout;
