import React, { useEffect, useRef, useState } from 'react'
import css from "./CheckPasswordPage.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from '../../components/Avatar/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/userSlice';

const CheckPasswordPage = () => {

  const [data, setData] = useState({ password: "" });
  const focusInput = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  //console.log("location:", location);
  //console.log("userId:", location.state._id);

  useEffect(() => {
    // Focus on the password input box
    focusInput.current.focus();
  });

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  function handleOnChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
      userId: location?.state._id
    });
  }

  async function handleSubmit (e) {
    e.preventDefault();

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: {
          userId: location?.state?._id,
          password: data.password
        },
        withCredentials: true
      });

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);

        setData({ password: "" });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error", error);
    }
  }

  return (
    <div className='mx-2'>
      <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

          <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
            {/*<PiUserCircle
              size={70}
            />*/}
            <Avatar
              width={75}
              height={75}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
            <h2 className='font-semibold text-lg mt-1 text-center'>{location?.state?.name}</h2>
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
                ref={focusInput}
              />
            </div>

            <button className='bg-primary text-lg text-white hover:bg-secondary p-2 rounded mt-2 font-bold leading-relaxed tracking-wide'>
              Confirm password
            </button>
          </form>

          <p className='text-center mt-2'><Link className="hover:text-primary font-semibold ml-1" to={"/forgotPassword"}>Forgot password?</Link></p>
        </div>
      </div>
    </div>
  )
}

export default CheckPasswordPage;
