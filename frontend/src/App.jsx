import { Navbar, LogIn } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HotelList from "./components/HotelList";
import HotelDetails from "./components/HotelDetails";
import CustomerRegistration from "./components/CustomerRegistration";
import axios from "axios";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState(null); // Store the user data
  const [hotels, setHotels] = useState([]); // Store the fetched hotels

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/hotels");
        setHotels(response.data); // Save the fetched hotels
      } catch (error) {
        console.error("Error fetching hotels:", error.message);
      }
    };

    fetchHotels();
  }, []);

  // Log the current user state whenever it changes
  useEffect(() => {
    console.log("Current user state:", user);
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<LogIn setUser={setUser} />} />
        <Route path="/login" element={<LogIn setUser={setUser} />} />
        <Route path="/hotels" element={<HotelList hotels={hotels} />} />
        <Route path="/hotels/:id" element={<HotelDetails user={user} />} />
        <Route path="/customer_registration" element={<CustomerRegistration />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </Router>
  );
}

