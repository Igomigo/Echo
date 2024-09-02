import React, { useState } from 'react'
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Avatar from './Avatar/Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';

const Sidebar = () => {

    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(true);

    return (
        <div className='w-full h-full'>
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
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200'>
                        <TbLogout
                            size={20}
                        />
                    </button>
                </div>
            </div>

            {/** Edit user details */}
            {editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} data={user}/>
            )}
        </div>
    )
}

export default Sidebar
