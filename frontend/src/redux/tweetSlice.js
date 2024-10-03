import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    myTweets: [],
    refresh: false,
    isActive: true,
  },
  reducers: {
    getTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getMyTweets: (state, action) => {
      state.myTweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { getTweets, getRefresh, getIsActive, getMyTweets } =
  tweetSlice.actions;
export default tweetSlice.reducer;
