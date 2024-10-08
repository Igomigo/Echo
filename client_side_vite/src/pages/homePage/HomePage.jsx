import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser, setOnlineUser, setSocketConnection } from '../../redux/userSlice';
import Sidebar from '../../components/Sidebar';
import logo from "../../assets/Echo-logo.jpeg";
import io from "socket.io-client";

const HomePage = () => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("reduxUser", user);

  const getUserDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;

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
      if (err.response?.data?.error) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("Error:", err);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  // Socket client connection
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token")
      }
    });

    socketConnection.on("onlineUser", (data) => {
      console.log("Online users:", data);
      dispatch(setOnlineUser(data))
    });

    // Handle socket errors
    socketConnection.on("error", (message) => {
      console.log(message);
      dispatch(logout());
      navigate("/email");
    });

    dispatch(setSocketConnection(socketConnection));
    console.log("socket Connection:", socketConnection);

    return () => {
      socketConnection.disconnect();
    }
  }, []);

  const basePath = location.pathname === "/"

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar/>
      </section>

      {/** Display the message page */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>

      <div className={`${!basePath ? 'lg:hidden' : 'lg:flex'} flex-col justify-center items-center gap-2 hidden`}>
        <div className=''>
           <img
              src={logo}
              width={250}
              alt='logo'
              className='rounded-full'
           />
        </div>
        <p className='text-lg text-slate-600'>Select user to send message</p>
      </div>      
    </div>
  )
}

export default HomePage;
