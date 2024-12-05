import React, { useContext, useState } from 'react';
import AdminSiderbar from './AdminSidebar';
import EcomContext from '../../context/EcomContext';

function CreateProducts() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);  // Updated to handle file(s) properly
  const { showHide, categories } = useContext(EcomContext);

  // Handle form submission
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (!name || !category || !price || !description || !images) {
        showHide("error", "Please fill in all the fields");
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('description', description);

      // Loop through the selected files and append them to FormData
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      const res = await fetch("https://bimscollection.onrender.com/api/product", {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,  // Ensure auth token is passed if needed
        },
        body: formData,
      });

      const data = await res.json();

      if (data.message) {
        showHide("error", "Couldn't create new product");
      } else {
        showHide("success", "New Product Created Successfully!");
      }
    } catch (error) {
      console.error(error);
      showHide("error", "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex">
      <AdminSiderbar />
      <section className="bg-inherit w-full dark:bg-gray-900 p-4">
        <div className="max-w-2xl mx-auto py-8 px-4 lg:py-16">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Add a New Product</h2>
          <form onSubmit={createHandler}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Type product name"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="₦2900"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="#">Select category</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={(e) => setImages(e.target.files)}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
                  multiple
                  required
                />
              </div>

              {/* Product Description */}
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your description here"
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#D97706] rounded-lg focus:ring-4 focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreateProducts;
