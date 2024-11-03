import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import NFTDisplay from './components/NFTDisplay.js';
import ListNFT from './components/ListNFT';
import NFTCards from './components/NFTCards';
import NFTDetail from './components/NFTDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/nft-page" element={<NFTPage />}/>        
          <Route path="/profile" element={<Profile />}/>
          <Route path="/sell-nft" element={<SellNFT />}/>  
          <Route path="/nft-display" element={<NFTDisplay />} />
          <Route path="/list-nft" element={<ListNFT />} />     
          <Route path="/" element={<NFTCards />} />
          <Route path="/nft/:id" element={<NFTDetail />} />      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
