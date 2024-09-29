import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Avatar from './Avatar/Avatar';
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";

const MessagePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state?.user);
  const params = useParams();
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false
  });

  const socketConnection = useSelector(state => state?.user?.socketConnection);
 
  console.log("params:", params.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setUserData(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-3'>
          <div className="flex items-center gap-3 p-2">
              <Link to={"/"}>
                <FaAngleLeft
                  size={25}
                />
              </Link>
              <div>
                <Avatar
                  width={50}
                  height={50}
                  name={userData?.name}
                  imageUrl={userData?.profile_pic}
                  userId={userData?._id}
                />
              </div>
              <div>
                <h3 className='font-semibold text-lg -my-2 text-ellipsis line-clamp-1'>{userData?.name}</h3>
                <p className='-my-2 text-md lg:text-md sm:text-sm'>
                  {
                    userData?.online ? <span className='text-primary'>online</span> : <span className='text-slate-400'>offline</span>
                  }
                </p>
              </div>
          </div>

          <div>
            <button className="cursor-pointer hover:text-primary">
              <IoEllipsisVerticalSharp
                size={22}
              />
            </button>
          </div>
      </header>
    </div>
  )
}

export default MessagePage;
