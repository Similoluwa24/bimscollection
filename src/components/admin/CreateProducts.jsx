import React, { useContext, useState } from 'react'
import AdminSiderbar from './AdminSidebar'
import EcomContext from '../../context/EcomContext'

function CreateProducts() {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState("")
    const {showHide,categories} = useContext(EcomContext)

    const createHandler = async(e)=>{
        e.preventDefault()
        console.log("submitted")
        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('images', images);
            // const category = e.category.target.value
            // const name = e.name.target.value
            // const price = e.price.target.value
            // const description = e.description.target.value
            // const images = e.images.target.value
            
            const res = await fetch("https://bimscollection.onrender.com/api/product",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    // "Content-Type":"multipart/form-data",
                    // "auth-token":`${localStorage.getItem("auth-token")}`
                },
                body: JSON.stringify({
                   formData
                })
            })
            const data = await res.json()
            console.log(data);
            
            if (data.message) {
                console.log(data.message)
                showHide("error","Couldn't create new product")
            }else{
                showHide("success","New Product Created")
            }
        } catch (error) {
            console.log({message:error.message});
            
        }
    }
  return (
    <div>
        <div className="flex">
            <AdminSiderbar/>

            <section className="bg-inherit w-full dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                <form action="#" onSubmit={createHandler}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                            <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                        </div>
                        {/* <div className="w-full">
                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                            <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required=""/>
                        </div> */}
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" onChange={(e)=>{setPrice(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="₦2900" required=""/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                           
                            <select  id="category" name="category" onChange={(e)=>{setCategory(e.target.value)}}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option  value="#">Select category</option>
                                {categories.map((item, index)=>(
                                <option key={index} value={item._id} >{item.name}</option> 
                             ))}                              
                            </select>
                           
                        </div>

                        <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="product">Upload file</label>
                        <input onChange={(e)=>{setImages(e.target.files[0])}} name="images"  className="block w-full text-sm text-gray-900 border  border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple/>
                             {console.log(images)}
                        </div>
                        
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" name='description' rows="8" onChange={(e)=>{setDescription(e.target.value)}} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                        </div>

                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#D97706] rounded-lg focus:ring-4  dark:focus:ring-primary-900 hover:bg-primary-800">
                        Add product
                    </button>
                </form>
            </div>
        </section>
        </div>
    </div>
  )
}

export default CreateProducts;