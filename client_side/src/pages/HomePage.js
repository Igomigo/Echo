import React from 'react'
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      HomePage

      {/** Display the message page */}
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default HomePage;
