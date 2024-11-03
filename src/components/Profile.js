import Navbar from "./Navbar";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import NFTTile from "./NFTTile";
import { ethers } from "ethers";
import backgroundImage from './2.jpg'; // Replace with your image path

export default function Profile() {
  const [data, updateData] = useState([]);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const [connected, setConnected] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const fileInputRef = useRef(null); // Ref for file input

  async function getNFTData() {
    try {
      let sumPrice = 0;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      updateAddress(addr); // Update address in Profile component
  
      // Check if connected to Sepolia
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) { // Sepolia's Chain ID
        alert("Please switch to the Sepolia test network.");
        return;
      }
  
      let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
      let transaction = await contract.getMyNFTs(); // Fetch NFTs owned by the connected wallet
  
      const items = await Promise.all(transaction.map(async (i) => {
        // Fetch metadata from the tokenURI
        let meta = await axios.get(i.tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      }));
  
      updateData(items);
      updateTotalPrice(sumPrice.toPrecision(3));
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl); // Set the profile image state to the file data URL
        localStorage.setItem('profileImage', imageUrl); // Save the image URL to localStorage
      };
      reader.readAsDataURL(file); // Convert image file to base64 URL
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setConnected(true);
        getNFTData();
        const storedImage = localStorage.getItem('profileImage'); // Retrieve image URL from localStorage
        if (storedImage) {
          setProfileImage(storedImage); // Set the profile image from localStorage
        }
        updateAddress(accounts[0]); // Update the address from the connected account
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <div
      className="profileClass"
      style={{
        minHeight: "100vh",
        
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navbar address={address} connected={connected} />
      <div 
        className="glassmorphism-box" // Add a class for glassmorphism effect
        style={{
        
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '20px',
            width: '90%', // or a specific width like '400px'
            maxWidth: '800px',
            margin: 'auto', // Center the box horizontally
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            color: 'white'
        }}
      >
        {connected ? (
          <>
            <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
              <div className="mb-5">
                <h2 className="font-bold">Wallet Address</h2>
                {address}
              </div>
              {/* Profile Image Placeholder */}
              <div 
                onClick={triggerFileInput} 
                className="flex justify-center items-center cursor-pointer"
              >
                <img
                  src={profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} // Placeholder image
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden" // Hide the file input
                ref={fileInputRef} // Reference to the file input
              />
            </div>
            <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
              <div>
                <h2 className="font-bold">No. of NFTs</h2>
                {data.length}
              </div>
              <div className="ml-20">
                <h2 className="font-bold">Total Value</h2>
                {totalPrice} ETH
              </div>
            </div>
            <div className="flex flex-col text-center items-center mt-11 text-white">
              <h2 className="font-bold">Your NFTs</h2>
              <div className="flex justify-center flex-wrap max-w-screen-xl">
                {data.map((value, index) => (
                  <NFTTile data={value} key={index} />
                ))}
              </div>
              <div className="mt-10 text-xl">
                {data.length === 0 ? "Oops, No NFT data to display (Are you logged in?)" : ""}
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-10 text-white">
            <h2>Please connect your wallet to view your NFTs</h2>
          </div>
        )}
      </div>
    </div>
  );
}
