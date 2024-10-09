import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import Avatar from './Avatar/Avatar';
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import { MdAttachFile } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import uploadFile from '../helpers/uploadFile';
import Loading from './Loading';
import backgroundImage from "../assets/echo-chat-wallpaper.jpeg";
import { IoSend } from "react-icons/io5";
import moment from "moment";

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
  const [imageVideoPopup, setImageVideoPopup] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const currentMessage = useRef(null);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  }, [allMessage]);

  const socketConnection = useSelector(state => state?.user?.socketConnection);
 
  console.log("params:", params.userId);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        setUserData(data);
      });

      socketConnection.on("message", (data) => {
        console.log("Message", data);
        setAllMessage(data);
      });
    }
  }, [socketConnection, params?.userId, user]);

  const handleImageVideoPopup = () => {
    setImageVideoPopup(prev => !prev);
  }

  const handleClearUploadedImage = () => {
    setMessage(prev => {
        return {
          ...prev,
          imageUrl: ""
        }
      });
  }

  const handleClearUploadedVideo = () => {
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: ""
      }
    });
  }

  const handleUploadImage = async (e) => {
    // Uploads images shared within chats to the cloud
    const file = e.target.files[0];

    setLoading(true);
    const uploadedPhoto = await uploadFile(file);
    setLoading(false);
    setImageVideoPopup(false);

    setMessage(prev => {
      return {
        ...prev,
        imageUrl: uploadedPhoto.secure_url
      }
    });
  }

  const handleUploadVideo = async (e) => {
    // Uploads videos shared within chats to the cloud
    const file = e.target.files[0];

    setLoading(true);
    const uploadedVideo = await uploadFile(file);
    setLoading(false);
    setImageVideoPopup(false);

    setMessage(prev => {
      return {
        ...prev,
        videoUrl: uploadedVideo.secure_url
      }
    });
  }

  const handleTextChange = (e) => {
    const { name, value } = e.target;

    setMessage(prev => {
      return {
        ...prev,
        text: value
      }
    });
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: user?._id,
          receiver: params?.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl
        });

        setMessage({
            text: "",
            imageUrl: "",
            videoUrl: ""
          });
      }
    }
  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-3'>
          <div className="flex items-center gap-3 py-2">
              <Link to={"/"} className='lg:hidden hover:text-primary'>
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
                <h3 className='font-semibold py-1 text-lg -my-2 text-ellipsis line-clamp-1'>{userData?.name}</h3>
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

      {/**Show all messages */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>

        {/** All messages will display here */}
        <div className='flex flex-col mx-2 py-3' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div className={`bg-white p-1 py-2 mt-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? "ml-auto bg-teal-300" : ""}`}>
                  <div className='w-full'>
                    {
                      msg?.imageUrl && (
                        <img
                          src={msg?.imageUrl}
                          className='w-full h-full object-scale-down'
                        />
                      )
                    }
                    {
                      msg?.videoUrl && (
                        <video
                          src={msg?.videoUrl}
                          className='w-full h-full object-scale-down'
                          controls
                        />
                      )
                    }
                  </div>
                  <p className='px-2'>{msg?.text}</p>
                  <p className="text-xs ml-auto w-fit text-slate-500">{moment(msg?.createdAt).format("hh:mm")}</p>
                </div>
              )
            })
          }
        </div>

        {/** Show uploaded image */}
        {
          message.imageUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-white' onClick={handleClearUploadedImage}>
                  <IoClose size={30}/>
              </div>
              <div className='bg-white p-3'>
                  <img
                    src={message.imageUrl}
                    alt='uploadImage'
                    className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  />
              </div>
            </div>
          )
        }

        {/** Show uploaded video */}
        {
          message.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-800 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div onClick={handleClearUploadedVideo} className='absolute top-0 right-0 w-fit p-2 cursor-pointer hover:text-white'>
                <IoClose size={30}/>
              </div>
              <div className='bg-white p-3'>
                <video
                  src={message.videoUrl}
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full sticky bottom-0 flex justify-center items-center'>
              <Loading/>
            </div>
          )
        }
      </section>

      {/** Send message input */}
      <section className='h-16 bg-white flex items-center px-1'>
        <div className='relative'>
          <button onClick={handleImageVideoPopup} title='attach file' className='flex justify-center items-center w-11 h-11 rounded-full hover:text-primary'>
            <MdAttachFile
              size={25}
            />
          </button>

          {/** Image and Video popup */}
          {
            imageVideoPopup && (
              <div className='bg-white shadow rounded absolute bottom-12 w-36 p-2'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-2 cursor-pointer hover:bg-slate-200'>
                    <div className='text-primary'>
                      <FaRegImage size={20} />
                    </div>
                    <p>Image</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-2 cursor-pointer hover:bg-slate-200'>
                    <div className='text-purple-600'>
                      <FaVideo size={20} />
                    </div>
                    <p>Video</p>
                  </label>

                  <input
                    type='file'
                    id='uploadImage'
                    accept='image/*'
                    onChange={handleUploadImage}
                    hidden
                  />

                  <input
                    type='file'
                    id='uploadVideo'
                    accept='video/*'
                    onChange={handleUploadVideo}
                    hidden
                  />
                </form>
              </div>
            )
          }
        </div>

        {/** Input Box */}
        <form onSubmit={handleSendMessage} className='w-full h-full flex gap-3 mr-4 my-3'>
            <input
              type='text'
              placeholder='Enter your message'
              className='py-1 px-4 outline-none border focus:border-none w-full h-full rounded-full'
              value={message.text}
              onChange={handleTextChange}
            />
            <button type='submit' className='text-primary hover:text-secondary'>
              <IoSend
                size={25}
              />
            </button>
        </form>
      </section>

    </div>
  )
}

export default MessagePage;
