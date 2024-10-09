import React, { useEffect, useState } from 'react'
import { BsChatDotsFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Avatar from './Avatar/Avatar';
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';


const Sidebar = () => {
    const socketConnection = useSelector(state => state?.user?.socketConnection);
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit("sidebar", user?._id);

            socketConnection.on("conversation", (data) => {
                console.log("conversation:", data);

                const conversationUserData = data?.map((conversationUser, index) => {
                    if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
                        return {
                                ...conversationUser,
                                userDetails: conversationUser?.sender
                        }
                    } else if (conversationUser?.receiver?._id !== user?._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.receiver
                        }
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser?.sender
                        }
                    }
                });

                setAllUser(data);
            });
        }
    }, [socketConnection, user]);

    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-700 flex flex-col justify-between'>
                <div>
                    <NavLink className={({isActive}) => `w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200 ${isActive && "bg-slate-200"}`} title='chat'>
                        <BsChatDotsFill
                            size={20}
                        />
                    </NavLink>

                    <div onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200' title='add friend'>
                        <FaUserPlus
                            size={20}
                        />
                    </div>
                </div>

                <div>
                    <button onClick={() => setEditUserOpen(true)} title={user?.name} className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200'>
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
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

                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scroll'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-600'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>
                                    Explore users to start a conversation with.
                                </p>
                            </div>
                        )
                    }

                    {
                        allUser.map((conv, index) => {
                            return (
                                <div key={conv?._id}>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/** Edit user details */}
            {editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} userData={user}/>
            )}

            {/** Search User */}
            {
                openSearchUser && (
                    <SearchUser onClose={() => setOpenSearchUser(false)}/>
                )
            }
        </div>
    )
}

export default Sidebar;
