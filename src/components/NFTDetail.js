// NFTDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nftData } from './data';
import Navbar from './Navbar';
import { ethers } from 'ethers'; // Import ethers
import './NFTDetail.css';
import YourMintingContract from './YourMintingContract.json'; // Import your contract ABI

const NFTDetail = () => {
  const { id } = useParams();
  const nft = nftData.find((nft) => nft.id === parseInt(id, 10));
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);

        const signer = web3Provider.getSigner();
        const contractAddress = '0xE30A1C70C61FB3d2de3518348dCe9b3045a37E30'; // Replace with your contract address
        const mintingContract = new ethers.Contract(contractAddress, YourMintingContract.abi, signer);
        setContract(mintingContract);
      } else {
        alert('Please install MetaMask!');
      }
    };
    initProvider();
  }, []);

  if (!nft) return <div className="nft-not-found">NFT not found</div>;

  // Function to handle the purchase logic
  const handleBuyNFT = async () => {
    if (!contract) return;

    try {
      const transaction = await contract.mintNFT(nft.tokenURI); // Replace with your contract's mint function and pass the token URI
      await transaction.wait(); // Wait for the transaction to be mined
      alert(`You have bought ${nft.title} for ${nft.Price}!`);
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Minting failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="nft-detail-container">
        <h1 className="nft-detail-title">{nft.title}</h1>
        <img src={nft.image} alt={nft.title} className="nft-detail-image" />
        <p className="nft-detail-description">{nft.description}</p>
        <p className="nft-detail-price">Price: {nft.Price}</p>
        <p className="nft-detail-owner">Owner: {nft.Owner}</p>
        <p className="nft-detail-seller">Seller: {nft.Seller}</p>
        
        <button className="buy-nft-button" onClick={handleBuyNFT}>
          Buy NFT
        </button>
      </div>
    </>
  );
};

export default NFTDetail;
