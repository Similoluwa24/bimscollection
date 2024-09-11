import React, { useContext } from 'react'
import AdminSiderbar from './AdminSidebar'
import EcomContext from '../../context/EcomContext'

function Dashboard() {
  const {allUsers, product} = useContext(EcomContext)
  return (
    <div>
      <div className="flex  w-full">
            <AdminSiderbar/>
            <div className="dashboard">
              <div className="m-12 grid grid-cols-4 gap-8 data">
                <div className="bg-[brown] p-16 box-1">
                    <p>{allUsers.length} users</p>
                </div>

                <div className="bg-[brown] p-16 box-2">
                  <p>{product.length} products</p>
                </div>

                <div className="bg-[brown] p-16 box-3">
                  
                </div>

                <div className="bg-[brown] p-16 box-4">
                  
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard