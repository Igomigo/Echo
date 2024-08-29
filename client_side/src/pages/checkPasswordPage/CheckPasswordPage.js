import React, { useState } from 'react'
import css from "./CheckPassword.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from '../../components/Avatar/Avatar';

const CheckPasswordPage = () => {

  const [data, setData] = useState({ password: "" });

  const navigate = useNavigate();
  const location = useLocation();

  //console.log("location:", location);
  //console.log("userId:", location.state._id);

  function handleOnChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
      userId: location.state._id
    });
  }

  async function handleSubmit (e) {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(url, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({ password: "" });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error", error);
    }
  }

  return (
    <div>
      <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

          <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
            {/*<PiUserCircle
              size={70}
            />*/}
            <Avatar
              width={70}
              height={70}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
            <h2 className='font-semibold text-lg mt-2 text-center'>{location?.state?.name}</h2>
          </div>

          <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>

            <div className='flex flex-col gap-1'>
              <label htmlFor='password'>Password: </label>
              <input
                type="password"
                id='password'
                name='password'
                placeholder='Enter your password'
                className='bg-slate-200 px-2 py-1'
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>

            <button className='bg-primary text-lg text-white hover:bg-secondary p-2 rounded mt-2 font-bold leading-relaxed tracking-wide'>
              Confirm password
            </button>
          </form>

          <p className='text-center mt-2'>Don't have an account yet? <Link className="hover:text-primary font-semibold ml-1" to={"/register"}>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default CheckPasswordPage;
