import React from "react";
import { useNavigate } from "react-router-dom";
import My_image from "../assets/hotel_image.jpg";

const HotelCard = ({ id, name, address, phoneNumber, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotels/${id}`); // Navigate to the hotel details page
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image || My_image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{address}</p>
        <p className="text-gray-600">📞 {phoneNumber}</p>
      </div>
    </div>
  );
};

export default HotelCard;
