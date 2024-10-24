import React, { useEffect, useState } from 'react'
import { BsChatDotsFill } from "react-icons/bs";
import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import Avatar from './Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { logout } from '../redux/userSlice';


const Sidebar = () => {
    const socketConnection = useSelector(state => state?.user?.socketConnection);
    const user = useSelector(state => state?.user);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

                setAllUser(conversationUserData);
            });
        }
    }, [socketConnection, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/email");
        localStorage.clear();
    }

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
                    <button title='logout' onClick={handleLogout} className='w-12 h-12 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200'>
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
                                <Link to={`/${conv?.userDetails?._id}`} key={conv?._id} className='flex items-center gap-2 py-3 px-2 hover:cursor-pointer rounded hover:bg-slate-200'>
                                    <div>
                                        <Avatar
                                            imageUrl={conv?.userDetails?.profile_pic}
                                            name={conv?.userDetails?.name}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div>
                                        <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                        <div className='text-slate-500 text-xs flex items-center gap-1'>
                                            <div className='flex items-center gap-2'>
                                                {
                                                    conv?.lastMsg?.imageUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaImage/></span>
                                                            {!conv?.lastMsg?.text && <span>Image</span>}
                                                        </div>
                                                    )
                                                }
                                                {
                                                    conv?.lastMsg?.videoUrl && (
                                                        <div className='flex items-center gap-1'>
                                                            <span><FaVideo/></span>
                                                            {!conv?.lastMsg?.text && <span>Video</span>}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                conv?.lastMsg?.text && (
                                                    <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        conv?.unSeenMsg > 0 && (
                                            <p className='flex items-center justify-center text-xs ml-auto p-2 w-6 h-6 bg-primary text-white rounded-full font-semibold'>{conv?.unSeenMsg}</p>
                                        )
                                    }
                                </Link>
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
