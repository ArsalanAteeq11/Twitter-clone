import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";
import Tweet from "./Tweet";
import useGetTweets from "../hooks/useGetTweets";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { myTweets } = useSelector((store) => store.tweet);
  const { id } = useParams();
  useGetProfile(id);
  useGetTweets(id, user);
  const userID = user?._id === id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const followAndUnfollowHandler = async () => {
    try {
      const actionType = user?.following?.includes(id) ? "unfollow" : "follow";
      const res = await axios.post(
        `${USER_API_END_POINT}/${actionType}/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );

      dispatch(followingUpdate(id)); // Update the local store

      // Refresh data if necessary
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  if (!profile) {
    return navigate("/404");
  }

  return (
    <div className="lg:w-[50%] md:w-[40%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center py-2">
          <div
            className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <FaArrowLeft size="20px" />
          </div>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-sm text-gray-500">
              {userID ? myTweets?.length : "10"} Posts
            </p>
          </div>
        </div>
        <img
          alt=""
          src="https://cdn.vectorstock.com/i/500p/07/19/software-development-programming-coding-vector-29570719.jpg"
          className="w-full h-[250px]"
        />
        <div className="absolute top-[250px] ml-4 border-4 border-white rounded-full">
          <Avatar
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAANlBMVEX///+ZmZmVlZXa2tqSkpKPj4/m5ub8/PzNzc3w8PD4+PigoKDg4ODS0tK4uLioqKivr6/CwsIOjwJ1AAAFXElEQVR4nO1c23q0KgwdDoqAgr7/y/46nbbqAEkAne5vsy56N+kCciIJPh4NDQ0NDQ0NDQ0N/wcoY/QPjFGf5nOAHqfFzZ5x+QXmZ7dMQn+a1xNqXLxljHO2B99g/TJ+didVP81dJ1kUvOvmqf8USTXNVvI4uxdHaedpo3gzTaUXlti6IyRb9M0MewK9F8X+RnpmYeDRvh01c3dZtRlgzQtSlIO5g9/os+htkH68nJ52edv32sTu6nPuPck2AhTtlcaiBrpxvGO6jJ9xXTk9xjpnrvGJZq6wfRv4fIk16xrH+2LIdP097G01fpeYiq7Jb9vDvu4eVjzfb1R1iMbWpse4r2gppv7+badc7YyVw4WPNX+WnMtUir2HdLUYDpj/uF5BnNjuc7oXDqcRcqnDTyDix5rtif1vRofRiq5KcoMxEOnPNyOFSitsBVNWiADH3+L/RndC/LCCGk6IjRBhpyvgX74vjQqF4NfHbmw9gmGpN4Q9DE9o+ghfm10ZP3gP+JC68Q6wHhalDQgLmZNqrmZwgWkBAHrQBXbABsASZMkWgjdMPkMi4DPw+fxgHZdALFCPEbYykZaRkO7g1YOhQIOBKN9ba0g0yknAq+S5WrjATnqApcCeJjOrUQ9EPoJQnxGWwrMIPkZEmoU4HES8g0wtAlh5UDcfWJMZy4p3sPnVI5iVF8JOkNU64mTCEQXChlFGgsgKs+xYoQqpVdzMdkmm+2qDusrBQQARjlZIet4KpyEbYO1G2VrO/Q51GWYSVEKBk4PQlROQ1UoLyUFWxcC07Q0eJRc8G0w42kBOCtH1rHSRyiDXySzVSjDu9Ym0C0M50yeosQSRg3wzTNgJzkKeoOaEGP//QjxlF4SyIjXvRxRWfhGpXwwEEeT2DiZA/YAvARU3eP1jX/f/6wgybs/TE0pYUlfvYoKMs6/BhB96WPdyF8EVUvpB9CvGwUtyU+8GgltLfeslr3/pP72HYAmuNhLZnSFpnXkyQYIfXBVuXsTYHzCKxbGOQJLqB7GRZOuOROO8EQ7tbKiRBJcsSDsAQV5PHmfR1JQak6lzKzB3HYHKWanZjIKrZsEAF4JZYIaWPBIJhYI1uuGFjeBy6WVW4La4DUYQ1gwNZGR0I9K3OumIKbpJN1wkveOkU8aXU6pIZl8dvXqkUgdCvySumFMMM8rUca3hcOk8BB2v9mStONHmzOzyxiuFGSqYuNd19DLFC0NUr3PqgybSZitorkVbf3kjKjH/XzBoEDkVnteHiDiaLAv+RngLM5zME8H4BLU30whXHcESWQRBO84V9kIos8m2ulDKleUQdggtOns4RYXMpHDwL5AIZ5pIRFrpdGfIeRWMEr7lXAWrfeHtVArmPlTA02RHkW+83Wdl0XjUeb1FExBP9CcrKTyTsyHz4mkwfVpy6XzZKb7z4mEwdSSY0SA54ehZM3vjexzlFfr9FaexknKCxxOpMOJ4NLu6BMkloxCOfdlyeXt+GV3YAA6Zerm4vbRKw977NFMUYyes2gOina/hxfgR1VWaUt6A6poTIQtnLw+o9tZlz6/iawiFHLGg8CsavAzAJAsXZFzwaqgqQ3nJq6Z6llI6mxyBIrUvE5DLVS95J15lE697+Vf+cvL5cOI6fmAlF8GPWjsmA9f1iIBbcf1Tcp1vK3K555F273NeiXHE0HU1CLqxSJ89cJ4DIxCfWNjtnrTxnuhVGB32Swacuevftgeg+snDj/xk56c7P7Fwgh68PX+I5Hfntu+RQA3lGziKwVm2zSjwX2bPb7q44Y980eWhjO6nxflXIcf6eZl6/cc+ivP30faroaGhoaGhoeG/iH8yXzh9wKHc4QAAAABJRU5ErkJggg=="
            size="120"
            round={true}
          />
        </div>
        <div className="text-right mt-4 mr-2">
          {user && user?._id === profile?._id ? (
            <button className="px-4 py-1 border border-gray-400 hover:bg-gray-300 transition-all rounded-full font-semibold cursor-pointer">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-5 py-2 border border-gray-400 text-lg text-white bg-black transition-all rounded-full font-semibold cursor-pointer"
            >
              {user?.following?.includes(id) ? "unfollow" : "follow"}
            </button>
          )}
        </div>

        <div className="m-4">
          <h1 className="font-bold text-2xl">{profile?.name}</h1>
          <p className="text-sm text-gray-500">{`@${profile?.username}`}</p>
        </div>
        <div className="flex m-4">
          <div className="flex items-center">
            <p className="text-gray-500">{profile?.followers?.length}</p>
            <h1 className="font-semibold text-md pl-2 pr-3">Followers</h1>
          </div>
          <div className="flex items-center">
            <p className="text-gray-500">{profile?.following?.length}</p>
            <h1 className="font-semibold text-md pl-2 pr-3">Following</h1>
          </div>
        </div>
        <div className="m-4">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        {myTweets?.map((myTweet) => (
          <Tweet key={myTweet?._id} myTweet={myTweet} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
