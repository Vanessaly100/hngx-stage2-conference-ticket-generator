import React from 'react'
import Navbar from '../Navbar';
import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

const Rootlayou = () => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);
  return (
    <>
    <div>
         <Navbar/>

      <main>
        <Outlet />
      </main>

    </div>
    </>
  )
}

export default Rootlayou