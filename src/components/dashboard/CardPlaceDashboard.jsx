import React from 'react'

const CardPlaceDashboard = () => {
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">ចំនួនកន្លែងសរុប</div>
            <div>
              <p className="text-gray-500 text-sm">កន្លែង</p>
              <p className="text-2xl font-bold text-gray-800">200</p>
              <p className="text-green-600 text-sm">ទា</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardPlaceDashboard
