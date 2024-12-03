import React, { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import AdminSiderbar from './AdminSidebar'
import { Link } from 'react-router-dom'

function AdminProducts() {
  const {product} = useContext(EcomContext)
  return (
    <div>
      <div className="flex">
        <AdminSiderbar/>
        <div className="mx-auto mt-12 relative w-full overflow-x-auto shadow-md sm:rounded-lg table">
        <div className="flex justify-end buton">
          <Link to="/admin/createproducts">
           <button type="button" className="py-2.5  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create New +</button>
          </Link>
       </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                          Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                          ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                          Price
                          </th>
                         
                      </tr>
                  </thead>
                  <tbody>
                    {product.map((items, index)=>(

                      <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          
                          <td className="px-6 py-4">
                          {items.name}
                          </td>
                          <td className="px-6 py-4">
                          {items._id}
                          </td>                       
                          <td className="px-6 py-4">
                          {items.price}
                          </td>                       
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