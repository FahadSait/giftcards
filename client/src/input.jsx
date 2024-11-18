import React, { useState } from "react";
import axios from "axios";

const NumberInput = () => {
  const [responseId, setResponseId] = useState("");
  const [inputValue, setInputValue] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const data = JSON.stringify({
      amount: parseInt(amount) * 100, // Convert to paise
      currency: "INR",
    });

    const config = {
      method: "post",
      url: "http://localhost:3001/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      handleRazorpayScreen(response.data.amount);
    } catch (error) {
      console.error("Error at Razorpay order creation:", error.response || error);
      alert(
        error.response?.data?.error || "Failed to create Razorpay order. Please try again."
      );
    }
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay payment gateway.");
      return;
    }

    const options = {
      key: "rzp_test_mYrxFk25VdC4K4",
      amount: amount,
      currency: "INR",
      name: "Gift Cards",
      description: "Payment to Gift Cards",
      handler: (response) => {
        setResponseId(response.razorpay_payment_id);
      },
      prefill: {
        name: "Gift Cards",
        email: "fksait9038@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleButtonClick = (value) => {
    setInputValue(value.toString());
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length })
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join("");
  };

  return (
    <div className="container">
      <h3>Enter a value</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="input"
        placeholder="Enter amount"
      />
      <div className="button-container">
        <button onClick={() => handleButtonClick(250)} className="button">
          ₹ 250
        </button>
        <button onClick={() => handleButtonClick(500)} className="button">
          ₹ 500
        </button>
        <button onClick={() => handleButtonClick(1000)} className="button">
          ₹ 1000
        </button>
      </div>
      <button
        onClick={() => createRazorpayOrder(inputValue)}
        className="proceed-button"
      >
        Proceed
      </button>
      {responseId && (
        <p className="response-id">Code - {generateRandomString(12)}</p>
      )}
    </div>
  );
};

export default NumberInput;
