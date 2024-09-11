import React, { useContext, useState } from 'react'
import ProductItems from './ProductItems'
import EcomContext from '../../context/EcomContext'

function Product() {
  const {product} = useContext(EcomContext)

     // for pagination
     const [currentPage, setCurrentPage] = useState(1)
     const recordsPerPage = 6
     const lastIndex = currentPage * recordsPerPage
     const firstIndex = lastIndex - recordsPerPage
     const records = product.slice(firstIndex, lastIndex)
     const npage = Math.ceil(product.length/recordsPerPage)
     const number = [...Array(npage).keys()].map(i => i + 1);

     const prePage = () => {
      if (currentPage > 1){
        setCurrentPage(currentPage - 1)} ;
    };
  
    const nextPage = () => {
      if (currentPage < npage) {
        setCurrentPage(currentPage + 1)};
    };
  
    const changeCPage = (page) => {
      setCurrentPage(page);
    };
     //pagination done
   
  return (
    <div>
          <div className=''>
            <div className='grid grid-cols-3 gap-5 px-6' >
               {records.map((items, index)=>(<ProductItems key={index} product_items_prop={items} />))}
            </div>
        </div>


        <nav>
        <ul className='space-x-24 bg-[brown] text-[blanchedalmond] mb-5  '>
          <li onClick={prePage}>
            <a href="#prev">Prev</a>
          </li>

          {number.map((item) => (
            <li
              className={`page-item ${currentPage === item ? 'active' : ''}`}
              key={item}
              onClick={() => changeCPage(item)}
            >
              <a href="#">{item}</a>
            </li>
          ))}

          <li onClick={nextPage}>
            <a href="#next">Next</a>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Product