import React, { useContext } from 'react'
import EcomContext from '../../context/EcomContext'
import AdminSiderbar from './AdminSidebar'
import { Link } from 'react-router-dom'

function AdminCatergories() {
    const {categories} = useContext(EcomContext)
  return (
    <div>
            <div className="flex">
        <AdminSiderbar/>
        <div className="mx-auto mt-12 relative w-full overflow-x-auto shadow-md sm:rounded-lg table">
        <div className="flex justify-end buton">
          <Link to="/admin/createcategory">
           <button type="button" class="py-2.5  px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Create New +</button>
          </Link>
       </div>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                          Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                          Description
                          </th>                       
                         
                      </tr>
                  </thead>
                  <tbody>
                    {categories.map((items, index)=>(

                      <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          
                          <td class="px-6 py-4">
                          {items.name}
                          </td>
                          <td class="px-6 py-4">
                          {items.description}
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

export default AdminCatergories