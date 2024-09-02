import React, { useState } from 'react'
import css from "./CheckEmailPage.module.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";

const CheckEmailPage = () => {

  const [data, setData] = useState({ email: "" });

  const navigate = useNavigate();

  function handleOnChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  async function handleSubmit (e) {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(url, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({ email: "" });

        navigate("/password", {
          state: response?.data.data
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server side error");
      console.log("error", error);
    }
  }

  return (
    <div>
      <div className='bg-white mt-5 w-full max-w-md rounded overflow-hidden p-4 formDiv mx-auto'>
        <div className=''>

          <div className='w-fit mx-auto mb-2'>
            <PiUserCircle
              size={70}
            />
          </div>

          <h3 className={ css.welcome }>Welcome to Echo</h3>

          <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>

            <div className='flex flex-col gap-1'>
              <label htmlFor='email'>Email: </label>
              <input
                type="email"
                id='email'
                name='email'
                placeholder='Enter your email'
                className='bg-slate-200 px-2 py-1'
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>

            <button className='bg-primary text-lg text-white hover:bg-secondary p-2 rounded mt-2 font-bold leading-relaxed tracking-wide'>
              Verify Email
            </button>
          </form>

          <p className='text-center mt-2'>Don't have an account yet? <Link className="hover:text-primary font-semibold ml-1" to={"/register"}>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default CheckEmailPage;
