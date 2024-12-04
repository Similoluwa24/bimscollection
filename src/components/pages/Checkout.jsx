import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import EcomContext from "../../context/EcomContext";

function Checkout() {
  const { cartItems, calculateTotalAmount, isAuthenticated } = useContext(EcomContext);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    const amount = calculateTotalAmount();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("https://bimscollection.onrender.com/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ ...data, amount }),
      });

      const responseData = await res.json();
      if (res.ok) {
        window.location.href = responseData.link; // Redirect to payment page
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto my-12">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-center text-[#D97706] mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold border-b pb-3 mb-4">Order Summary</h2>
          <table className="w-full border-collapse">
            <thead className="bg-[#D97706] text-[#F4F4F9] text-left">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Qty</th>
                <th className="py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.products?.map((item) => (
                <tr key={item.product?._id} className="border-b last:border-none">
                  <td className="py-2 px-4">{item.product?.name}</td>
                  <td className="py-2 px-4">
                    <img
                      src={item.product?.images[0]?.img}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">{item.quantity}</td>
                  <td className="py-2 px-4">
                    <s>N</s>{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <h3 className="text-lg font-semibold">
              Total: <s>N</s>{calculateTotalAmount()}
            </h3>
          </div>
        </div>

        {/* Delivery and Payment Form */}
        <div className="bg-[#F4F4F9] shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold border-b pb-3 mb-4 text-center">Delivery Details</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">Delivery Address</label>
              <input
                type="text"
                name="address"
                required
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                required
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
              />
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium">Currency</label>
              <select
                name="currency"
                className="w-full px-4 py-2 rounded border focus:ring focus:ring-[#D97706]"
                required
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div className="text-lg font-semibold">
              <p>Total Amount: <s>N</s>{calculateTotalAmount()}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D97706] text-[#F4F4F9] py-3 rounded hover:bg-[#a42cd6] transition"
            >
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
