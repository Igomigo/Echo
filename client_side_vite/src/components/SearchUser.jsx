import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from "./UserSearchCard";
import toast from 'react-hot-toast';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearch] = useState("");

  const handleSearchUser = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;

    try {
      setLoading(true);
      const response = await axios.post(url, {
        data: searchInput,
      }, {
        withCredentials: true
      });
      setLoading(false);

      setSearchUser(response?.data?.data);

    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  }

  useEffect(() => {
    handleSearchUser()
  }, [searchInput]);

  console.log("SearchUser:", searchUser);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-3 z-10'>
      <div className='w-full max-w-lg mx-auto mt-10'>
        {/** Search user input */}
        <div className='bg-white h-14 rounded-full overflow-hidden flex focus-within:border-2 focus-within:border-primary'>
            <input
                type='text'
                placeholder='Search user by name, email...'
                className='w-full outline-none py-2 px-4 rounded-full focus:border-none'
                onChange={(e) => setSearch(e.target.value)}
                value={searchInput}
            />
            <div className='px-2 h-14 w-14 flex justify-center items-center'>
                <IoSearchOutline
                  size={25}
                />
            </div>
        </div>

        {/** Display searched user(s) */}
        <div className='bg-white w-full mt-2 p-4 rounded max-h-height overflow-auto'>
            {/** Handles condition where no user is found */}
            {
              searchUser.length === 0 && !loading && (
                <p className='text-center text-slate-500'>No user found</p>
              )
            }

            {/** Handles the condition where a response is pending/loading */}
            {
              loading && (
                <p><Loading/></p>
              )
            }

            {/** Handles condition where user(s) is/are found */}
            {
              searchUser !== 0 && !loading && (
                searchUser.map((user, index) => {
                  return (
                    <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                  )
                })
              )
            }

        </div>
      </div>

      <div className='absolute top-0 right-0 text-2xl lg:text-4xl hover:text-white' onClick={onClose}>
        <button className='p-4'>
          <IoClose size={30}/>
        </button>
      </div>
    </div>
  )
}

export default SearchUser;
