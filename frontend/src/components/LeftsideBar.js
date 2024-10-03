import React from "react";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const LeftsideBar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      console.log(res);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate("/login");
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[20%]">
      <div>
        <img
          className="w-8 ml-4"
          src="https://img.freepik.com/premium-vector/twitter-logo_979658-3412.jpg?w=740"
        />
      </div>
      <div className="mt-6">
        <div
          className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <MdHome className="w-7 h-7 mr-3 " />
          <h1 className="font-semibold text-lg">Home</h1>
        </div>
        <div className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer">
          <IoSearch className="w-7 h-7 mr-3 " />
          <h1 className="font-semibold text-lg">Explore</h1>
        </div>
        <div className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer">
          <IoMdNotificationsOutline className="w-7 h-7 mr-3 " />
          <h1 className="font-semibold text-lg">Notification</h1>
        </div>
        <div
          className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
          onClick={() => {
            navigate(`/profile/${user?._id}`);
          }}
        >
          <CgProfile className="w-7 h-7 mr-3" />
          <h1 className="font-semibold text-lg">Profile</h1>
        </div>
        <div className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer">
          <CiBookmark className="w-7 h-7 mr-3" />
          <h1 className="font-semibold text-lg">Bookmarks</h1>
        </div>
        <div
          onClick={logoutHandler}
          className="flex items-center px-3 py-1 mb-3 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer"
        >
          <LuLogOut className="w-7 h-7 mr-3" />
          <h1 className="font-semibold text-lg">Logout</h1>
        </div>
        <button className="text-white bg-blue-500 px-3 py-2 w-full rounded-full font-semibold text-md">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftsideBar;
