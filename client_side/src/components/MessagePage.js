import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Avatar from './Avatar/Avatar';

const MessagePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  });

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white'>
          <div>
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
                <h3>{userData?.name}</h3>
                <p>
                  {
                    userData?.online ? "online" : "offline"
                  }
                </p>
              </div>
          </div>
      </header>
    </div>
  )
}

export default MessagePage;
