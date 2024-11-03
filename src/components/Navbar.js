import logo from '../logo_3.png';
import fullLogo from '../AEROTOKEN.png';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ethers } from "ethers";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');

  async function getAddress() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      updateAddress(addr);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  }

  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70", "bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70", "bg-green-500");
  }

  async function connectWebsite() {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }
    
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if (network.chainId !== 5) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x5' }],
          });
        } catch (switchError) {
          console.error("Error switching network:", switchError);
        }
      }
      updateButton();
      getAddress();
      toggleConnect(true);
    } catch (error) {
      console.error("Connection error:", error);
    }
  }

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.listAccounts().then(accounts => {
      if (accounts.length > 0) {
        getAddress();
        toggleConnect(true);
        updateButton();
      }
    });

    const handleAccountsChanged = () => window.location.reload();
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  return (
    <div className="bg-transparent text-white w-full">
      <nav className="flex items-center justify-between py-3 px-5">
        <Link to="/" className="flex items-center space-x-3">
          <img src={fullLogo} alt="NFT Marketplace Logo" width={120} height={120} />
          <div className="font-bold text-xl">AEROTOKEN</div>
        </Link>
        
        <div className="bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-4">
          <ul className="flex items-center space-x-6 font-bold text-lg">
            <li className={`${location.pathname === "/" ? 'border-b-2' : ''} hover:pb-0`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`${location.pathname === "/sellNFT" ? 'border-b-2' : ''} hover:pb-0`}>
              <Link to="/sellNFT">Buy Tickets</Link>
            </li>
            <li className={`${location.pathname === "/list-NFT" ? 'border-b-2' : ''} hover:pb-0`}>
              <Link to="/list-NFT">List NFT</Link>
            </li>
            <li className={`${location.pathname === "/profile" ? 'border-b-2' : ''} hover:pb-0`}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-4 flex items-center space-x-4">
          <button 
            className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" 
            onClick={connectWebsite}
          >
            {connected ? "Connected" : "Connect Wallet"}
          </button>
          <div className="text-sm">
            {currAddress !== "0x" ? `Connected to ${currAddress.substring(0, 15)}...` : "Not Connected"}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
