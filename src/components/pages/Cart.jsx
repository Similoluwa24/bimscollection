import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EcomContext from "../../context/EcomContext";

function Cart() {
  const {
    cartItems,
    calculateSubTotal,
    calculateVat,
    calculateTotalAmount,
    removeCartItems,
    updateCartItems,
  } = useContext(EcomContext);

  const renderCartItems = () =>
    cartItems.products?.map((item) => (
      <tr key={item.product?._id} className="border-b border-gray-300">
        <td className="p-4">{item.product?.name}</td>
        <td className="p-4">
          <img
            src={item.product?.images[0]?.img}
            alt={item.product?.name}
            className="w-[80px] h-[80px] object-cover rounded"
          />
        </td>
        <td className="p-4">
          <s>N</s>{item.product?.price}
        </td>
        <td className="p-4">
          <s>N</s>{item.amount}
        </td>
        <td className="p-4">
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateCartItems(item.product?._id, e.target.value)}
            className="w-[60px] text-center border rounded p-1 outline-none"
          />
        </td>
        <td className="p-4">
          <button
            onClick={() => removeCartItems(item.product?._id)}
            className="text-red-600 hover:text-red-800 transition"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="container max-w-5xl mx-auto my-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#D97706]">Your Cart</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#D97706] text-[#F4F4F9] uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Product Image</th>
              <th className="p-4">Price</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody>{renderCartItems()}</tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-8 border-t border-gray-300 pt-4">
        <div className="flex justify-between items-center text-lg">
          <span>Subtotal:</span>
          <span>
            <s>N</s>{calculateSubTotal()}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg mt-2">
          <span>VAT (7.5%):</span>
          <span>
            <s>N</s>{calculateVat()}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg mt-2 font-bold">
          <span>Total:</span>
          <span>
            <s>N</s>{calculateTotalAmount()}
          </span>
        </div>
        <div className="flex justify-end mt-4">
          <Link
            to="/checkout"
            className="bg-[#cda124] text-[white] px-6 py-2 rounded-md hover:bg-[#a42cd6] transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
