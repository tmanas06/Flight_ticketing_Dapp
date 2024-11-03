// BookFlightTicket.js
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './BookFlightTicket.css'; // Importing the CSS file

export default function BookFlightTicket() {
  const [formParams, updateFormParams] = useState({
    from: '',
    to: '',
    class: '',
    seatNumber: '',
    date: '',
    airline: '',
  });

  const navigate = useNavigate();

  // Options for form selections
  const locations = ["Hyderabad", "Mumbai", "Delhi", "Chennai","Guwhati"];
  const classes = ["Economy", "Business", "First Class"];
  const airlines = ["Air India", "IndiGo", "SpiceJet", "GoAir"];

  // Sample seats per class and airline
  const seatOptions = {
    "Air India": {
      Economy: ["1A", "1B", "2A", "2B"],
      Business: ["3A", "3B", "4A"],
      "First Class": ["5A", "5B"]
    },
    IndiGo: {
      Economy: ["6A", "6B", "7A", "7B"],
      Business: ["8A", "8B", "12A", "12B"],
      "First Class": ["9A"]
    },
  };

  const handleFormChange = (field, value) => {
    // Reset seat selection when airline or class changes
    if (field === "airline" || field === "class") {
      updateFormParams({ ...formParams, [field]: value, seatNumber: '' });
    } else {
      updateFormParams({ ...formParams, [field]: value });
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    navigate("/nft-display", { state: formParams });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen background">
      <div className="overlay"></div> {/* Overlay for improved visibility */}
      <Navbar />
      <div className="flex flex-col place-items-center w-full">
        <form 
          className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4" 
          style={{ width: '400px', margin: '20px 0' }} // Adjust width and margin as needed
        >
          <h3 className="text-center font-bold text-purple-500 mb-8">Book Your Flight Ticket</h3>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="from">From</label>
            <select 
              className="shadow border rounded w-full py-2 px-3" 
              onChange={(e) => handleFormChange("from", e.target.value)} 
              value={formParams.from}
            >
              <option value="" disabled>Select Departure</option>
              {locations.map(location => <option key={location}>{location}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="to">To</label>
            <select 
              className="shadow border rounded w-full py-2 px-3" 
              onChange={(e) => handleFormChange("to", e.target.value)} 
              value={formParams.to}
            >
              <option value="" disabled>Select Destination</option>
              {locations.map(location => <option key={location}>{location}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="airline">Airline</label>
            <select 
              className="shadow border rounded w-full py-2 px-3" 
              onChange={(e) => handleFormChange("airline", e.target.value)} 
              value={formParams.airline}
            >
              <option value="" disabled>Select Airline</option>
              {airlines.map(airline => <option key={airline}>{airline}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="class">Class</label>
            <select 
              className="shadow border rounded w-full py-2 px-3" 
              onChange={(e) => handleFormChange("class", e.target.value)} 
              value={formParams.class}
            >
              <option value="" disabled>Select Class</option>
              {classes.map(flightClass => <option key={flightClass}>{flightClass}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="seatNumber">Seat Number</label>
            <select 
              className="shadow border rounded w-full py-2 px-3" 
              onChange={(e) => handleFormChange("seatNumber", e.target.value)} 
              value={formParams.seatNumber}
              disabled={!formParams.airline || !formParams.class} // Disable until airline and class are selected
            >
              <option value="" disabled>Select Seat</option>
              {formParams.airline && formParams.class && 
                seatOptions[formParams.airline][formParams.class].map(seat => <option key={seat}>{seat}</option>)
              }
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="date">Date</label>
            <input 
              className="shadow border rounded w-full py-2 px-3" 
              type="date" 
              onChange={(e) => handleFormChange("date", e.target.value)} 
              value={formParams.date}
            />
          </div>

          <button 
            onClick={handleApply} 
            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}
