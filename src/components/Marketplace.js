import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { GetIpfsUrlFromPinata } from "../utils";
import bgvid1 from "../bg.mp4";
import bgvid2 from "./vid2.mp4";
import bgvid3 from "./vid3.mp4";
import NFTCards from "./NFTCards";
import './Marketplace.css';
import { Link } from 'react-router-dom';

export default function Marketplace() {
    const sampleData = [
        // ... (your existing sample data)
    ];

    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const videos = [bgvid1, bgvid2, bgvid3];

    // ... (your existing getAllNFTs function)



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Background Image */}
            <div className="marketplace-background"></div>

            {/* Fixed Navbar */}
            <Navbar />

            {/* Hero Section with Slideshow Videos */}
            <section className="relative h-screen">
                {videos.map((video, index) => (
                    <video 
                        key={index}
                        autoPlay 
                        loop 
                        muted 
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ))}
                <div className="flex flex-col items-center justify-center h-full relative z-10">
                    <h1 className="text-6xl font-bold text-white title-font mb-4">AEROTOKEN</h1>
                    <p className="text-2xl text-white subtitle-font">Decentralized Flight Ticketing with NFTs</p>
                    <Link to="/sellNFT">
    <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
        Explore NFT Tickets
    </button>
</Link>
                </div>
            </section>
 {/* NFT Collection Section */}
 <section className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                <h2 className="bg-white bg-opacity-30 backdrop-blur-lg text-5xl font-extrabold text-gray-800 text-center mb-10 uppercase tracking-wider py-4 px-6 rounded-lg shadow-lg">
    Top Travel NFTs
</h2>
                    <NFTCards nftData={sampleData} />
                </div>
            </section>
            {/* How It Works Section */}
            <section className="py-20 how-it-works-background relative z-10">
    <div className="container mx-auto px-4">
    <h2 className="bg-white bg-opacity-30 backdrop-blur-lg text-5xl font-extrabold text-gray-800 text-center mb-10 uppercase tracking-wider py-4 px-6 rounded-lg shadow-lg">
    How to Book Flight Ticket NFTs
</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">1. Connect Your Wallet</h3>
                <p>Link your cryptocurrency wallet to our platform to start browsing available flights.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">2. Choose Your Flight</h3>
                <p>Browse through our selection of flight NFTs and select the one that matches your travel plans.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">3. Purchase and Fly</h3>
                <p>Complete the purchase using cryptocurrency and receive your unique flight ticket NFT. You're ready to fly!</p>
            </div>
        </div>
    </div>
</section>


           {/* Benefits Section */}
<section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white relative z-10">
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Benefits of NFT Flight Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
                <i className="fas fa-lock text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p>Blockchain technology ensures your ticket is tamper-proof and authentic.</p>
            </div>
            <div className="text-center">
                <i className="fas fa-exchange-alt text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Transferable</h3>
                <p>Easily transfer or resell your ticket if your plans change.</p>
            </div>
            <div className="text-center">
                <i className="fas fa-globe text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Global</h3>
                <p>Book flights from anywhere in the world without currency exchange hassles.</p>
            </div>
            <div className="text-center">
                <i className="fas fa-gift text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold mb-2">Collectible</h3>
                <p>Keep your NFT tickets as unique digital collectibles after your flight.</p>
            </div>
        </div>
    </div>
</section>


            {/* Featured Destinations */}
            <section className="py-20 bg-gray-100 relative z-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Featured Destinations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Add 3 featured destination cards here */}
                        {/* Example: */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src="https://as1.ftcdn.net/v2/jpg/05/50/67/02/1000_F_550670265_zIMZUDc4GFu0ktPySMkjYMiWPSLjsjfU.jpg" alt="Destination" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Singapore, Malaysia</h3>
                                <p className="text-gray-600">Experience the city of love with our exclusive NFT flight tickets.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>
                        {/* Repeat for other destinations */}
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src="https://th.bing.com/th/id/OIP.ZeTZGYqstBboldttSz9QvQHaFC?rs=1&pid=ImgDetMain" alt="Destination" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Paris, France</h3>
                                <p className="text-gray-600">Experience the city of love with our exclusive NFT flight tickets.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-md">
                            <img src="https://th.bing.com/th/id/OIP.jjK7Ah_eSEhDQ5tgK3zI9wHaEo?rs=1&pid=ImgDetMain" alt="Destination" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Andaman and Nicobar Islands, India</h3>
                                <p className="text-gray-600">Experience the city of love with our exclusive NFT flight tickets.</p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

           

            {/* Call to Action */}
            <section className="py-20 bg-blue-600 text-white relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Revolutionize Your Travel?</h2>
                    <p className="text-xl mb-8">Join the future of flight ticketing with NFTs</p>
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-full text-xl font-semibold hover:bg-gray-100 transition duration-300">
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">AEROTOKEN</h3>
                            <p>Revolutionizing air travel with blockchain technology.</p>
                        </div>
                       
                        <div>
                            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-2xl hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-2xl hover:text-blue-400"><i className="fab fa-facebook"></i></a>
                                <a href="#" className="text-2xl hover:text-blue-400"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="text-2xl hover:text-blue-400"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </footer>
        </div>
    );
}