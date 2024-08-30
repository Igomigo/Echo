import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setToken, setUser } from '../../redux/userSlice';

const HomePage = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("reduxUser", user);

  const getUserDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: url,
        withCredentials: true
      });

      if (response?.data?.data) {
        dispatch(setUser(response.data.data));
      }

      if (response?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }

      console.log("User details:", response);
    } catch (err) {
      console.log("Error:", err);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      HomePage

      {/** Display the message page */}
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default HomePage;
