import React, { useState } from "react";
import Avatar from "react-avatar";
import axios from "axios";
import { PiImageSquare } from "react-icons/pi";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDiscription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const id = user?._id;
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (description === "") {
      toast.error("please fill the field!");
    }
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res.data.message);
        setDiscription("");
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };
  return (
    <div className="w-100%">
      <div>
        <div className="flex justify-evenly items-center border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600 bg-gray-200 transition-all"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-2`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600 bg-gray-200 transition-all"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-2`}
          >
            <h1 className="font-semibold text-gray-600 text-lg ">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAANlBMVEX///+ZmZmVlZXa2tqSkpKPj4/m5ub8/PzNzc3w8PD4+PigoKDg4ODS0tK4uLioqKivr6/CwsIOjwJ1AAAFXElEQVR4nO1c23q0KgwdDoqAgr7/y/46nbbqAEkAne5vsy56N+kCciIJPh4NDQ0NDQ0NDQ0N/wcoY/QPjFGf5nOAHqfFzZ5x+QXmZ7dMQn+a1xNqXLxljHO2B99g/TJ+didVP81dJ1kUvOvmqf8USTXNVvI4uxdHaedpo3gzTaUXlti6IyRb9M0MewK9F8X+RnpmYeDRvh01c3dZtRlgzQtSlIO5g9/os+htkH68nJ52edv32sTu6nPuPck2AhTtlcaiBrpxvGO6jJ9xXTk9xjpnrvGJZq6wfRv4fIk16xrH+2LIdP097G01fpeYiq7Jb9vDvu4eVjzfb1R1iMbWpse4r2gppv7+badc7YyVw4WPNX+WnMtUir2HdLUYDpj/uF5BnNjuc7oXDqcRcqnDTyDix5rtif1vRofRiq5KcoMxEOnPNyOFSitsBVNWiADH3+L/RndC/LCCGk6IjRBhpyvgX74vjQqF4NfHbmw9gmGpN4Q9DE9o+ghfm10ZP3gP+JC68Q6wHhalDQgLmZNqrmZwgWkBAHrQBXbABsASZMkWgjdMPkMi4DPw+fxgHZdALFCPEbYykZaRkO7g1YOhQIOBKN9ba0g0yknAq+S5WrjATnqApcCeJjOrUQ9EPoJQnxGWwrMIPkZEmoU4HES8g0wtAlh5UDcfWJMZy4p3sPnVI5iVF8JOkNU64mTCEQXChlFGgsgKs+xYoQqpVdzMdkmm+2qDusrBQQARjlZIet4KpyEbYO1G2VrO/Q51GWYSVEKBk4PQlROQ1UoLyUFWxcC07Q0eJRc8G0w42kBOCtH1rHSRyiDXySzVSjDu9Ym0C0M50yeosQSRg3wzTNgJzkKeoOaEGP//QjxlF4SyIjXvRxRWfhGpXwwEEeT2DiZA/YAvARU3eP1jX/f/6wgybs/TE0pYUlfvYoKMs6/BhB96WPdyF8EVUvpB9CvGwUtyU+8GgltLfeslr3/pP72HYAmuNhLZnSFpnXkyQYIfXBVuXsTYHzCKxbGOQJLqB7GRZOuOROO8EQ7tbKiRBJcsSDsAQV5PHmfR1JQak6lzKzB3HYHKWanZjIKrZsEAF4JZYIaWPBIJhYI1uuGFjeBy6WVW4La4DUYQ1gwNZGR0I9K3OumIKbpJN1wkveOkU8aXU6pIZl8dvXqkUgdCvySumFMMM8rUca3hcOk8BB2v9mStONHmzOzyxiuFGSqYuNd19DLFC0NUr3PqgybSZitorkVbf3kjKjH/XzBoEDkVnteHiDiaLAv+RngLM5zME8H4BLU30whXHcESWQRBO84V9kIos8m2ulDKleUQdggtOns4RYXMpHDwL5AIZ5pIRFrpdGfIeRWMEr7lXAWrfeHtVArmPlTA02RHkW+83Wdl0XjUeb1FExBP9CcrKTyTsyHz4mkwfVpy6XzZKb7z4mEwdSSY0SA54ehZM3vjexzlFfr9FaexknKCxxOpMOJ4NLu6BMkloxCOfdlyeXt+GV3YAA6Zerm4vbRKw977NFMUYyes2gOina/hxfgR1VWaUt6A6poTIQtnLw+o9tZlz6/iawiFHLGg8CsavAzAJAsXZFzwaqgqQ3nJq6Z6llI6mxyBIrUvE5DLVS95J15lE697+Vf+cvL5cOI6fmAlF8GPWjsmA9f1iIBbcf1Tcp1vK3K555F273NeiXHE0HU1CLqxSJ89cJ4DIxCfWNjtnrTxnuhVGB32Swacuevftgeg+snDj/xk56c7P7Fwgh68PX+I5Hfntu+RQA3lGziKwVm2zSjwX2bPb7q44Y980eWhjO6nxflXIcf6eZl6/cc+ivP30faroaGhoaGhoeG/iH8yXzh9wKHc4QAAAABJRU5ErkJggg=="
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => {
                setDiscription(e.target.value);
              }}
              onKeyDown={handleKeyPress}
              className="outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <PiImageSquare />
            </div>
            <button
              onClick={submitHandler}
              className="border-none px-4 py-1 text-lg text-white cursor-pointer bg-blue-500 rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
