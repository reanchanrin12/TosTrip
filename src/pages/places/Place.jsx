import React from 'react'
import CategoryList from '../../components/getcategoryid/CategoryList'
import PlacesBanner from '../../components/layouts/banner/PlacesBanner'

const Place = () => {
  return (
    <div>
      <div className='mx-auto max-w-screen-2xl md:px-[7%] px-4 py-10 font-[Suwannaphum]'>
        <PlacesBanner />
        <h1 className='text-center text-4xl font-bold mt-20'>កន្លែងទេសចរណ៍</h1>
        <CategoryList />
      </div>
    </div>
  )
}

export default Place;
