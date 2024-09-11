import React from 'react'
import AdminHeader from './AdminHeader'
import AdminProducts from './AdminProducts'
import Customers from './AdminProducts'
import Dashboard from './Dashboard'
import Transactions from './Transactions'
import Orders from './Orders'
import AdminSidebar from './AdminSidebar'

function AdminLayouts() {
  return (
    <div>
        <div className="flex  w-full">
            <AdminSidebar/>
            {/* <AdminHeader/> */}
        </div>
    </div>
  )
}

export default AdminLayouts