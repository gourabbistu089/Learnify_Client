import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <div className="text-white mt-10">Loading...</div>;
  }

  return (
    <div className="w-screen text-white bg-richblack-900 flex font-inter relative min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] overflow-auto flex-grow">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
