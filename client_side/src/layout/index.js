import React from 'react'
import logo from "../assets/Echo-logo.jpeg";
import css from "./index.module.css";

const AuthLayouts = ({children}) => {
  return (
    <div>
      <>
        <header className="flex justify-center items-center py-3 shadow-md bg-white">
            <img
                src={logo}
                alt='Echo logo'
                width={100}
                height={60}
                className={css.image}
            />
        </header>

        { children }
      </>
    </div>
  )
}

export default AuthLayouts;
