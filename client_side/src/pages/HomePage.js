import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import axios from "axios";

const HomePage = () => {

  const getUserDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: url,
        withCredentials: true
      });

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
