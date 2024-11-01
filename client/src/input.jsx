import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const NumberInput = () => {

  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        handleRazorpayScreen(response.data.amount)
      })
      .catch((error) => {
        console.log("error at", error)
      })
  }

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Some error at razorpay screen loading")
      return;
    }

    const options = {
      key: 'rzp_test_GcZZFDPP0jHtC4',
      amount: amount,
      currency: 'INR',
      name: "Gift Cards",
      description: "Payment to Gift Cards",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id)
      },
      prefill: {
        name: "Gift Cards",
        email: "fksait9038@gmail.com"
      },
      theme: {
        color: "#F4C430"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (value) => {
    setInputValue(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }




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
        <button onClick={() => handleButtonClick(250)} className="button">₹ 250</button>
        <button onClick={() => handleButtonClick(500)} className="button">₹ 500</button>
        <button onClick={() => handleButtonClick(1000)} className="button">₹ 1000</button>
      </div>
      <button onClick={handleRazorpayScreen(inputValue)} className="proceed-button">Proceed</button>
      {responseId && <p className="response-id"> Code - {generateRandomString(12)}</p>}
    </div>
  );
};



export default NumberInput;
