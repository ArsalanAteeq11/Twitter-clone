import React, { useEffect } from "react";
import LeftsideBar from "./LeftsideBar";
import RIghtSideBar from "./RIghtSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const navigate = useNavigate();
  const { user, otherusers } = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftsideBar />
      <Outlet />
      <RIghtSideBar otherusers={otherusers} />
    </div>
  );
};

export default Home;
