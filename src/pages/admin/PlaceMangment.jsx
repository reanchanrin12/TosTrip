import React from 'react'
import DashboardNav from '../../components/dashboard/DashboardNav'
import PlaceDashboard from '../../components/dashboard/PlaceDashboard'

const PlaceMangment = () => {
  return (
    
      <div className='font-[Suwannaphum]'>
        <div className="min-h-screen flex flex-col lg:flex-row">

          <aside className="w-full lg:w-64 bg-white shadow-md">
            <DashboardNav />
          </aside>
          <main className="flex-1 bg-gray-100 p-4">
            <PlaceDashboard />
          </main>
        </div>

      </div>
  )
}

export default PlaceMangment
