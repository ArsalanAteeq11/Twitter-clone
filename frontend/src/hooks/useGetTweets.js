import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getMyTweets } from "../redux/tweetSlice";

const useGetTweets = (id, user) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);
  const isFollowing = user?.following?.includes(id);
  const UserID = user?._id === id;
  const getMytweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/mytweets/${id}`, {
        withCredentials: true,
      });
      dispatch(getMyTweets(res.data.Tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFollowing || UserID) {
      getMytweets();
    } else {
      dispatch(getMyTweets(null));
    }
  }, [refresh, id]);
};

export default useGetTweets;
