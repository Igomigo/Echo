import React, { useState } from 'react'
import css from "./RegisterPage.module.css";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import uploadFile from "../../helpers/uploadFile";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  function handleOnChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  async function handleUploadPhoto (e) {
    const file = e.target.files[0];

    const upload = await uploadFile(file);
    console.log("Upload", upload);

    setData({
      ...data, "profile_pic": upload.secure_url
    });

    setUploadPhoto(file);
  }

  function handleClearUploadPhoto(e) {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto("");
  }

  function handleSubmit (e) {
    e.preventDefault();
    e.stopPropagation();    

    console.log("data:", data);
  }

  return (
    <div>
      <div className='bg-white mt-5 w-full max-w-md rounded overflow-hidden p-4 formDiv mx-auto'>
        <div className=''>
          <h3 className={css.welcome}>Welcome to Echo</h3>

          <form className='grid gap-4 mt-2' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor='name'>Name: </label>
              <input
                type="text"
                id='name'
                name='name'
                placeholder='Enter your name'
                className='bg-slate-200 px-2 py-1'
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>

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

            <div className='flex flex-col gap-1'>
              <label htmlFor='profile_pic'>Photo: 
                <div className='bg-slate-200 h-14 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                  <p className='text-sm max-w-[300] text-ellipsis line-clamp-1'>
                    {
                      uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                    }
                  </p>
                  {
                    uploadPhoto?.name && (
                      <button onClick={handleClearUploadPhoto} type='button' className='text-lg ml-2 hover:text-red-600 mt-1'>
                        <IoClose/>
                      </button>
                    )
                  }
                </div>
              </label>
              <input
                type="file"
                id='profile_pic'
                name='profile_pic'
                className='bg-slate-200 px-2 py-1'
                hidden
                onChange={handleUploadPhoto}
              />
            </div>

            <button className='bg-primary text-lg text-white hover:bg-secondary p-2 rounded mt-2 font-bold leading-relaxed tracking-wide'>
              Register
            </button>
          </form>

          <p className='text-center mt-2'>Already have an account? <Link className="hover:text-primary font-semibold ml-1" to={"/email"}>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
