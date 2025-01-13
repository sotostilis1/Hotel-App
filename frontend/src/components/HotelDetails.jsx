import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import My_image from "../assets/hotel_image.jpg";
import ReservationModal from "./ReservationModal";

const HotelDetails = ({ user }) => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hotels/${id}`);
        setHotel(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel details:", error.message);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!hotel) {
    return <p>Hotel not found</p>;
  }

  const handleRoomSelect = (roomType) => {
    setSelectedRoomType(roomType);
    setOpenModal(true);
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src={My_image}
          alt={hotel.name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
        <p className="text-gray-700 italic mb-4">{hotel.description}</p>
        <p className="text-gray-700 mb-2">📍 {hotel.address}</p>
        <p className="text-gray-700 mb-2">📞 {hotel.phone_number}</p>
        <h2 className="text-2xl font-semibold mt-4">Rooms</h2>

        <div className="flex flex-wrap gap-4">
          {hotel.rooms.map((room, index) => (
            <div
              key={index}
              onClick={() => handleRoomSelect(room.type)}
              className={`w-1/2 p-4 rounded-md cursor-pointer transition ${
                selectedRoomType === room.type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <p className="text-lg">{room.type}: ${room.cost} per night</p>
            </div>
          ))}
        </div>

        <ReservationModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          hotelInfo={hotel}
          selectedRoomType={selectedRoomType}
          user={user}
        />
      </div>
    </div>
  );
};

export default HotelDetails;
