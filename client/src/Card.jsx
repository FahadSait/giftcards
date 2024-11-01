import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css';
import amazonpic from './pictures/amazon.jpg';
import flipkartpic from './pictures/flipkart.png';
import starbuckspic from './pictures/starbucks.png';
import myntrapic from './pictures/myntra.png';
import Choice from './Choice.jsx'
import Signup from './Signup'
import Login from './Login'

const cardsData = [
  {
    imageUrl: amazonpic,
    subheading: "Amazon",
    handleClick: "/amazon",
  },
  {
    imageUrl: flipkartpic,
    subheading: "Flipkart",
    handleClick: "/flipkart",
  },
  {
    imageUrl: starbuckspic,
    subheading: "StarBucks",
    handleClick: "/starbucks",
  },
  {
    imageUrl: myntrapic,
    subheading: "Myntra",
    handleClick: "/myntra",
  },
];

const CardGrid = ({ imageUrl, subheading, handleClick }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    if (handleClick) {
      navigate(handleClick);
    }
  };

  return (
    <div className="card" onClick={onCardClick}>
      <img src={imageUrl} alt={subheading} className="card-img" />
      <h3 className="card-subheading">{subheading}</h3>
    </div>
  );
};

const Card = () => {
  return (
    <div>
      <div>
        <nav className="nav">
          <a className="logo" href="/dashboard">
            Giftcards
          </a>
          <ul>
            <a href="/option">
              Logout
            </a>
          </ul>
        </nav>
      </div>
      <div className="grid-container">
      {cardsData.map((card, index) => (
        <CardGrid
          key={index}
          imageUrl={card.imageUrl}
          subheading={card.subheading}
          handleClick={card.handleClick}
        />
      ))}
      </div>
    </div>
  );
};

export default Card;
