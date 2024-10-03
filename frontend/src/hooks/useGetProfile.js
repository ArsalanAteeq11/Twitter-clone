import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constant";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        console.log("profile", res.data.user);

        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error?.response?.data?.message);
        dispatch(getMyProfile(null));
      }
    };
    fetchMyProfile();
  }, [id]);
};
export default useGetProfile;
