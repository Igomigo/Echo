import React, { useState } from 'react'
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Avatar from './Avatar/Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';

const Sidebar = () => {

    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-700 flex flex-col justify-between'>
                <div>
                    <NavLink className={({isActive}) => `w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 ${isActive && "bg-slate-200"}`} title='chat'>
                        <BsChatDotsFill
                            size={20}
                        />
                    </NavLink>

                    <NavLink className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200' title='add friend'>
                        <FaUserPlus
                                size={20}
                        />
                    </NavLink>
                </div>

                <div>
                    <button onClick={() => setEditUserOpen(true)} title={user?.name} className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200'>
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200'>
                        <TbLogout
                            size={20}
                        />
                    </button>
                </div>
            </div>

            <div className='w-full'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-800'>
                        Message
                    </h2>
                </div>

                <div className='bg-slate-200 p-[0.5px] mx-1'></div>

                <div className='bg-red-500 h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scroll'>

                </div>
            </div>

            {/** Edit user details */}
            {editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} userData={user}/>
            )}
        </div>
    )
}

export default Sidebar;
