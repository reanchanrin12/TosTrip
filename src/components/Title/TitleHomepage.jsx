import React from 'react'
import { Link } from 'react-router'

const TitleHomepage = (title) => {
  return (
    <div className='text-center py-3 md:py-10'>
      <div className='flex flex-col md:flex-row justify-start  items-center gap-5'>
        <h2 className='text-xl sm:text-2xl md:text-3xl text-heade font-semibold'>
          {title.title}
        </h2>
        <Link to='/place'>
          <div className='bg-Primary hover:bg-Primary-dark text-white
        text-base md:text-lg px-4 md:px-7 py-2 
        rounded-sm transition-colors duration-300
        shadow-md hover:shadow-lg'>
          រុករក
        </div></Link>
      </div>
    </div>

  )
}

export default TitleHomepage
