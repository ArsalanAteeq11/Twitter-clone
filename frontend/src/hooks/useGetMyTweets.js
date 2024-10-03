import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import { getTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchAllTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true,
      });
      dispatch(getTweets(res.data.Tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${id}`,
        { withCredentials: true }
      );
      dispatch(getTweets(res.data.Tweets));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchAllTweets();
    } else {
      followingTweetHandler();
    }
  }, [isActive, refresh]);
};
export default useGetMyTweets;
