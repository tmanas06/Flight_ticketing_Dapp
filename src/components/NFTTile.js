import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const nfts = [
    {
        tokenId: 1,
        name: "NFT #1",
        description: "Description of NFT #1",
        image: "https://example.com/nft1.jpg", // Replace with actual image URLs
    },
    {
        tokenId: 2,
        name: "NFT #2",
        description: "Description of NFT #2",
        image: "https://example.com/nft2.jpg", // Replace with actual image URLs
    },
    {
        tokenId: 3,
        name: "NFT #3",
        description: "Description of NFT #3",
        image: "https://example.com/nft3.jpg", // Replace with actual image URLs
    },
];

function NFTTile() {
    return (
        <div className="flex flex-wrap justify-center">
            {nfts.map((nft) => (
                <Link key={nft.tokenId} to={`/nftPage/${nft.tokenId}`}>
                    <div className="border-2 m-4 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
                        <img src={nft.image} alt={nft.name} className="w-72 h-80 rounded-lg object-cover" />
                        <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
                            <strong className="text-xl">{nft.name}</strong>
                            <p>{nft.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

function NFTPage({ tokenId }) {
    const nft = nfts.find(nft => nft.tokenId === Number(tokenId));
    
    if (!nft) {
        return <div>NFT not found</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <img src={nft.image} alt={nft.name} className="w-80 h-80 rounded-lg" />
            <h1 className="text-2xl font-bold">{nft.name}</h1>
            <p>{nft.description}</p>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded">Buy NFT</button>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NFTTile />} />
                <Route path="/nftPage/:tokenId" element={<NFTPage />} />
            </Routes>
        </Router>
    );
}
