import React, { useEffect, useState } from 'react'
import Avatar from './Avatar/Avatar';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const EditUserDetails = ({ onClose,
  userData }) => {
  const [data, setData] = useState({
    name: userData?.name,
    email: userData?.email,
    profile_pic: userData?.profile_pic
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const upload = await uploadFile(file);

    setData({
      ...data, "profile_pic": upload?.secure_url
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Data beinbg sent:", data);
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`;
      console.log("Request Url:", url);

      const response = await axios({
        method: "post",
        url,
        data,
        withCredentials: true
      });

      console.log("Response:", response);

      if (response?.data?.success) {
        toast.success(response?.data?.message || "E no dey");
        console.log(response?.data?.message);
        dispatch(setUser(response?.data?.data));
        onClose();
      }
    } catch (error) {
      toast(error.response?.data?.message || "E no dey error");
      console.error(error);
    }
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-800 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white rounded px-4 py-6 m-2 w-full max-w-sm'>
        {/**
          *<h2 className='font-semibold'>Profile Details</h2>
          *<p className='text-sm'>Edit user</p>
        */}

        <form className='grid gap-3 mt-2' onSubmit={handleSubmit}>

          <div>
            <div className="my-1 flex flex-col justify-center items-center cursor-pointer" >
              <Avatar
                width={95}
                height={95}
                imageUrl={data?.profile_pic}
                name={data?.name}
                className={"text-xl"}
              />  

              <label className='mt-2.5 px-2 py-1 rounded hover:bg-slate-200 border border-primary' htmlFor='profile_pic'>Change Photo</label>
              <input
                type='file'
                name='profile_pic'
                id="profile_pic"
                onChange={handleUploadPhoto}
                hidden
              />
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Name: </label>
            <input
              type="text"
              name='name'
              id="name"
              value={data.name}
              onChange={handleChange}
              className='w-full py-1 px-2 focus:outline-primary bg-slate-300'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email: </label>
            <input
              type="email"
              name='email'
              id="email"
              value={data.email}
              onChange={handleChange}
              className='w-full py-1 px-2 focus:outline-primary bg-slate-300'
            />
          </div>

          <Divider/>

          <div className='flex gap-2 w-fit ml-auto'>
            <button onClick={onClose} className='border border-primary px-4 rounded hover:bg-primary hover:text-white text-secondary'>Cancel</button>
            <button type="submit" className='border border-primary px-4 rounded bg-primary text-white hover:bg-secondary'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails);
