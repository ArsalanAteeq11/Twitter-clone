import { Tweet } from "../model/tweetSchema.js";
import { User } from "../model/userSchema.js";

export const tweetCreate = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res
        .status(401)
        .json({ message: "Fields are required!", success: false });
    }
    const user = await User.findById(id).select("-password");
    await Tweet.create({
      description,
      userId: id,
      userDetail: user,
    });
    return res
      .status(201)
      .json({ message: "Tweet created successfully!", success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const tweetDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "tweet deleted successfully!", success: true });
  } catch (error) {}
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);
    if (tweet.like.includes(loggedInUserId)) {
      // dislike
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res
        .status(200)
        .json({ message: "User disliked your tweet!", success: true });
    } else {
      // like
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res
        .status(200)
        .json({ message: "User liked your tweet!", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getMyTweets = async (req, res) => {
  try {
    const UserID = req.params.id;
    const UserTweets = await Tweet.find({ userId: UserID }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      Tweets: UserTweets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "no post Yet" });
  }
};

export const getAllTweets = async (req, res) => {
  // loggedInUser ka tweets + following user ka tweets
  try {
    const loggedInUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const loggedInUserTweets = await Tweet.find({ userId: loggedInUserId });
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserTweetId) => {
        return Tweet.find({ userId: otherUserTweetId });
      })
    );
    return res.status(200).json({
      Tweets: loggedInUserTweets.concat(...followingUserTweets),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingTweets = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const loggedInUser = await User.findById(loggedInUserId);
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUsersId) => {
        return Tweet.find({ userId: otherUsersId });
      })
    );
    return res.status(200).json({
      Tweets: [].concat(...followingUserTweets),
    });
  } catch (error) {
    console.log(error);
  }
};
