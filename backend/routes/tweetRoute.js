import express from "express";
import {
  getAllTweets,
  getFollowingTweets,
  getMyTweets,
  likeOrDislike,
  tweetCreate,
  tweetDelete,
} from "../controller/tweetController.js";
import isAuth from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuth, tweetCreate);
router.route("/delete/:id").delete(isAuth, tweetDelete);
router.route("/like/:id").put(isAuth, likeOrDislike);
router.route("/alltweets/:id").get(isAuth, getAllTweets);
router.route("/followingtweets/:id").get(isAuth, getFollowingTweets);
router.route("/mytweets/:id").get(isAuth, getMyTweets);

export default router;
