import React, { useContext } from 'react'
import AdminSiderbar from './AdminSidebar'
import EcomContext from '../../context/EcomContext'

function Customers() {
  const {allUsers} = useContext(EcomContext)
  return (
    <div>
      <div className="flex">
        <AdminSiderbar/>
        <div className="mx-auto mt-12 table">
          <table>
            <thead className=''>
              <th className='p-6'>Full Name</th>
              <th className='p-6'>Last Name</th>
              <th className='p-6'>E-mail</th>
              <th className='p-6'>Address</th>
            </thead>

            <tbody>
              {allUsers.map((items, index) =>(

                <tr key={index}>
                  <td className='p-6 text-center'>{items.firstName}</td>
                  <td className='p-6 text-center'>{items.lastName}</td>
                  <td className='p-6 text-center'>{items.email} </td>
                  <td className='p-6 text-center'>{items.phone} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customers