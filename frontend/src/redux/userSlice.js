import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherusers: null,
    userRefresh: false,
    profile: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherusers = action.payload;
    },
    getUserRefresh: (state) => {
      state.userRefresh = !state.userRefresh;
    },
    getMyProfile: (state, action) => {
      state.profile = action.payload;
    },
    followingUpdate: (state, action) => {
      // unfollow
      if (state.user.following.includes(action.payload)) {
        state.user.following = state.user.following.filter((itemId) => {
          return itemId !== action.payload;
        });
      } else {
        // follow
        state.user.following.push(action.payload);
      }

      if (state.profile) {
        if (state.profile.followers.includes(state.user._id)) {
          state.profile.followers = state.profile.followers.filter(
            (itemId) => itemId !== state.user._id
          );
        } else {
          state.profile.followers.push(state.user._id);
        }
      }
    },
    updateUserBookmarks: (state, action) => {
      if (state.user) {
        state.user.bookmarks = action.payload;
      }
    },
  },
});

export const {
  getUser,
  getOtherUsers,
  getMyProfile,
  followingUpdate,
  getUserRefresh,
  updateUserBookmarks,
} = userSlice.actions;
export default userSlice.reducer;
