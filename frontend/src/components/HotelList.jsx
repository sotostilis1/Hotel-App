import React from "react";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels }) => {
  return (
    <div className="container mx-auto p-4 pt-10">
      <h1 className="text-center text-3xl font-bold my-6">Available Hotels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            address={hotel.address}
            phoneNumber={hotel.phone_number}
            image={hotel.image}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
