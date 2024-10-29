import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import css from "./Avatar.module.css";
import { useSelector } from 'react-redux';


const Avatar = ({userId, name, imageUrl, width, height, className}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser);

    let avatar = "";

    if (name) {
        const splitName = name?.split(" ");

        if (splitName.length > 1) {
            avatar = splitName[0][0] + splitName[1][0];
        } else {
            avatar = splitName[0][0];
        }
    }

    const bgColors = [
        "bg-slate-200",
        "bg-teal-200",
        "bg-red-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-slate-500",
        //"bg-stone-900",
        "bg-red-400",
        "bg-orange-400",
        "bg-sky-400",
        "bg-indigo-400",
        "bg-violet-400",
        //"bg-fuchsia-600"
    ]

    // Generate a consistent index based on userId or name
    const hashCode = (str) => {
        return str.split("").reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    };

    const colorIndex = Math.abs(hashCode(userId || name)) % bgColors.length;
    const bgColor = bgColors[colorIndex];

    const isOnline = onlineUser.includes(userId);

  return (
    <div
        className={`${css["avatar-container"]} relative`}
        style={{ width: `${width}px`, height: `${height}px` }}
    >
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={name}
                className={`${css["avatar-image"]} rounded-full`}
            />
        ) : name ? (
            <div className={`${css["avatar-initials"]} ${bgColor} ${className} rounded-full`}>
                {avatar}
            </div>
        ) : (
            <PiUserCircle size={width} />
        )}

        {
            isOnline && (
                <div className='bg-green-600 p-1 absolute bottom-1 right-0 rounded-full z-10'></div>
            )
        }
    </div>
  )
}

export default Avatar;
