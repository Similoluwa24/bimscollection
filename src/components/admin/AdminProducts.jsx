import React, { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import AdminSiderbar from './AdminSidebar'

function AdminProducts() {
  const {product} = useContext(EcomContext)
  return (
    <div>
      <div className="flex">
        <AdminSiderbar/>
      <div className="mx-auto mt-12 table">
          <table>
            <thead className=''>
              <th className='p-6'>ID</th>
              <th className='p-6'>Name</th>
              <th className='p-6'>Price</th>
              
            </thead>

            <tbody>
              {product.map((items, index) =>(

                <tr key={index}>
                  <td className='p-6 text-center'>{items._id} </td>
                  <td className='p-6 text-center'>{items.name}</td>
                  <td className='p-6 text-center'>{items.price}</td>
                  {/* <td className='p-6 text-center'>{items.phone} </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts