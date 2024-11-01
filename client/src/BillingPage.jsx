import React, { useState } from 'react';
import './index.css';

const BillingPage = () => {
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const [items, setItems] = useState([
    { name: 'Product 1', price: 100, quantity: 1 },
    { name: 'Product 2', price: 150, quantity: 2 },
  ]);

  const handleInputChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    const newItems = [...items];
    newItems[index].quantity = newQuantity;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing Details:', billingDetails);
    console.log('Items:', items);
    console.log('Total:', calculateTotal());
    // Here you could route to a payment gateway or save the billing details
  };

  return (
    <div className="billing-page">
      <h2>Billing Page</h2>
      <form onSubmit={handleSubmit} className="billing-form">
        <h3>Billing Details</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={billingDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={billingDetails.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={billingDetails.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={billingDetails.email}
          onChange={handleInputChange}
          required
        />
        
        <h3>Order Summary</h3>
        <div className="items-list">
          {items.map((item, index) => (
            <div key={index} className="item">
              <span>{item.name}</span>
              <span>Price: ₹{item.price}</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
              />
              <span>Subtotal: ₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="total">
          <strong>Total Amount: ₹{calculateTotal()}</strong>
        </div>

        <button type="submit" className="submit-btn">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default BillingPage;
