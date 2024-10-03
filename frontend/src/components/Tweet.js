import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoBookmark } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import DeleteModal from "./deleteModal/DeleteModal";
import { getUserRefresh, updateUserBookmarks } from "../redux/userSlice";

const Tweet = ({ tweet, myTweet }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((store) => store.user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const likeordislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      // Update the local user state optimistically
      let newBookmarks;
      if (user?.bookmarks?.includes(id)) {
        newBookmarks = user.bookmarks.filter((bookmarkId) => bookmarkId !== id);
      } else {
        newBookmarks = [...user.bookmarks, id];
      }
      dispatch(updateUserBookmarks(newBookmarks));
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmarks/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());
      dispatch(getUserRefresh());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAANlBMVEX///+ZmZmVlZXa2tqSkpKPj4/m5ub8/PzNzc3w8PD4+PigoKDg4ODS0tK4uLioqKivr6/CwsIOjwJ1AAAFXElEQVR4nO1c23q0KgwdDoqAgr7/y/46nbbqAEkAne5vsy56N+kCciIJPh4NDQ0NDQ0NDQ0N/wcoY/QPjFGf5nOAHqfFzZ5x+QXmZ7dMQn+a1xNqXLxljHO2B99g/TJ+didVP81dJ1kUvOvmqf8USTXNVvI4uxdHaedpo3gzTaUXlti6IyRb9M0MewK9F8X+RnpmYeDRvh01c3dZtRlgzQtSlIO5g9/os+htkH68nJ52edv32sTu6nPuPck2AhTtlcaiBrpxvGO6jJ9xXTk9xjpnrvGJZq6wfRv4fIk16xrH+2LIdP097G01fpeYiq7Jb9vDvu4eVjzfb1R1iMbWpse4r2gppv7+badc7YyVw4WPNX+WnMtUir2HdLUYDpj/uF5BnNjuc7oXDqcRcqnDTyDix5rtif1vRofRiq5KcoMxEOnPNyOFSitsBVNWiADH3+L/RndC/LCCGk6IjRBhpyvgX74vjQqF4NfHbmw9gmGpN4Q9DE9o+ghfm10ZP3gP+JC68Q6wHhalDQgLmZNqrmZwgWkBAHrQBXbABsASZMkWgjdMPkMi4DPw+fxgHZdALFCPEbYykZaRkO7g1YOhQIOBKN9ba0g0yknAq+S5WrjATnqApcCeJjOrUQ9EPoJQnxGWwrMIPkZEmoU4HES8g0wtAlh5UDcfWJMZy4p3sPnVI5iVF8JOkNU64mTCEQXChlFGgsgKs+xYoQqpVdzMdkmm+2qDusrBQQARjlZIet4KpyEbYO1G2VrO/Q51GWYSVEKBk4PQlROQ1UoLyUFWxcC07Q0eJRc8G0w42kBOCtH1rHSRyiDXySzVSjDu9Ym0C0M50yeosQSRg3wzTNgJzkKeoOaEGP//QjxlF4SyIjXvRxRWfhGpXwwEEeT2DiZA/YAvARU3eP1jX/f/6wgybs/TE0pYUlfvYoKMs6/BhB96WPdyF8EVUvpB9CvGwUtyU+8GgltLfeslr3/pP72HYAmuNhLZnSFpnXkyQYIfXBVuXsTYHzCKxbGOQJLqB7GRZOuOROO8EQ7tbKiRBJcsSDsAQV5PHmfR1JQak6lzKzB3HYHKWanZjIKrZsEAF4JZYIaWPBIJhYI1uuGFjeBy6WVW4La4DUYQ1gwNZGR0I9K3OumIKbpJN1wkveOkU8aXU6pIZl8dvXqkUgdCvySumFMMM8rUca3hcOk8BB2v9mStONHmzOzyxiuFGSqYuNd19DLFC0NUr3PqgybSZitorkVbf3kjKjH/XzBoEDkVnteHiDiaLAv+RngLM5zME8H4BLU30whXHcESWQRBO84V9kIos8m2ulDKleUQdggtOns4RYXMpHDwL5AIZ5pIRFrpdGfIeRWMEr7lXAWrfeHtVArmPlTA02RHkW+83Wdl0XjUeb1FExBP9CcrKTyTsyHz4mkwfVpy6XzZKb7z4mEwdSSY0SA54ehZM3vjexzlFfr9FaexknKCxxOpMOJ4NLu6BMkloxCOfdlyeXt+GV3YAA6Zerm4vbRKw977NFMUYyes2gOina/hxfgR1VWaUt6A6poTIQtnLw+o9tZlz6/iawiFHLGg8CsavAzAJAsXZFzwaqgqQ3nJq6Z6llI6mxyBIrUvE5DLVS95J15lE697+Vf+cvL5cOI6fmAlF8GPWjsmA9f1iIBbcf1Tcp1vK3K555F273NeiXHE0HU1CLqxSJ89cJ4DIxCfWNjtnrTxnuhVGB32Swacuevftgeg+snDj/xk56c7P7Fwgh68PX+I5Hfntu+RQA3lGziKwVm2zSjwX2bPb7q44Y980eWhjO6nxflXIcf6eZl6/cc+ivP30faroaGhoaGhoeG/iH8yXzh9wKHc4QAAAABJRU5ErkJggg=="
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">
                {tweet?.userDetail[0]?.name || myTweet?.userDetail[0].name}
              </h1>
              <p className="text-gray-500 text-sm ml-1">{`@${
                tweet?.userDetail[0]?.username ||
                myTweet?.userDetail[0]?.username
              } . 1m`}</p>
              {user?._id === tweet?.userId && (
                <p className="pl-2 text-gray-700 text-md font-bold">Author</p>
              )}
            </div>
            <div>
              <p>{tweet?.description || myTweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-gray-300 cursor-pointer rounded-full">
                  {tweet?.like?.includes(user?._id) ||
                  myTweet?.like?.includes(user?._id) ? (
                    <FaHeart
                      size="24px"
                      color="red"
                      onClick={() => {
                        likeordislikeHandler(tweet?._id || myTweet?._id);
                      }}
                    />
                  ) : (
                    <CiHeart
                      size="24px"
                      onClick={() => {
                        likeordislikeHandler(tweet?._id || myTweet?._id);
                      }}
                    />
                  )}
                </div>
                <p>{tweet?.like?.length || myTweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-gray-300 cursor-pointer rounded-full">
                  <FaRegComment size="20px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-gray-300 cursor-pointer rounded-full">
                  {user?.bookmarks?.includes(tweet?._id || myTweet?._id) ? (
                    <IoBookmark
                      size="24px"
                      color="black"
                      onClick={() => {
                        bookmarkHandler(tweet?._id || myTweet?._id);
                      }}
                    />
                  ) : (
                    <CiBookmark
                      size="24px"
                      onClick={() => {
                        bookmarkHandler(tweet?._id || myTweet?._id);
                      }}
                    />
                  )}
                </div>

                {/* <p>{tweet?.userDetail[0]?.bookmarks?.length}</p> */}
              </div>
              {user?._id === tweet?.userId || user?._id === myTweet?.userId ? (
                <div className="flex items-center">
                  <div className="p-2 hover:bg-gray-300 cursor-pointer rounded-full">
                    <MdDeleteOutline
                      size="24px"
                      // onClick={() => deleteTweetHandler(tweet?._id)}
                      onClick={handleOpenModal}
                    />
                    <DeleteModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      tweetId={tweet?._id || myTweet?._id}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
