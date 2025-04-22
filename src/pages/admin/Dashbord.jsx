import React from 'react'
import UserDashboard from '../../components/dashboard/UserDashboard'
import DashboardNav from '../../components/dashboard/DashboardNav'

const UserDashbord = () => {
  return (
    <div className='font-[Suwannaphum]'>
      <div className="min-h-screen flex flex-col lg:flex-row">

        <aside className="w-full lg:w-64 bg-white shadow-md">
          <DashboardNav />
        </aside>
        <main className="flex-1 bg-gray-100 p-4">
          <UserDashboard />
        </main>
      </div>

    </div>
  )
}

export default UserDashbord
