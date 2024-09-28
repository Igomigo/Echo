import React from 'react'
import Avatar from './Avatar/Avatar';
import { Link } from 'react-router-dom';

const userSearchCard = ({ user, onClose }) => {
  return (
    <Link to={`/${user?._id}`} onClick={onClose} className='flex gap-3 mt-3 p-1 lg:p-2 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
      <div>
            <Avatar
                width={50}
                height={50}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
            />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
            {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default userSearchCard;
