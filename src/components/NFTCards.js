// NFTCards.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { nftData } from './data';
import './NFTCards.css';

const NFTCards = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/nft/${id}`);
  };

  return (
    <div className="nft-card-container">
      {nftData.map((nft) => (
        <div
          key={nft.id}
          onClick={() => handleCardClick(nft.id)}
          className="nft-card"
        >
          <img src={nft.image} alt={nft.title} className="nft-card-image" />
          <h3 className="nft-card-title">{nft.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default NFTCards;
