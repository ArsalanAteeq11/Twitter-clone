import express from "express";
import {
  bookmark,
  follow,
  getmyprofile,
  getotherusers,
  Login,
  Logout,
  Register,
  unfollow,
} from "../controller/userController.js";
import isAuth from "../config/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.put("/bookmarks/:id", isAuth, bookmark);
router.get("/profile/:id", isAuth, getmyprofile);
router.get("/otherusers/:id", isAuth, getotherusers);
router.post("/follow/:id", isAuth, follow);
router.post("/unfollow/:id", isAuth, unfollow);

export default router;
