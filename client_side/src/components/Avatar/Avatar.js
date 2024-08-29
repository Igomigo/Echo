import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import css from "./Avatar.module.css";


const Avatar = ({userId, name, imageUrl, width, height}) => {

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

    const randomIndex = Math.floor(Math.random() * bgColors.length);
    const bgColor = bgColors[randomIndex];

  return (
    <div
        className={`${css["avatar-container"]}`}
        style={{ width: `${width}px`, height: `${height}px` }}
    >
        {imageUrl ? (
            <img
                src={imageUrl}
                alt={name}
                className={css["avatar-image"]}
            />
        ) : name ? (
            <div className={`${css["avatar-initials"]} ${bgColor}`}>
                {avatar}
            </div>
        ) : (
            <PiUserCircle size={width} />
        )}
    </div>
  )
}

export default Avatar;
