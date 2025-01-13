import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ user }) => {
  const [customer, setCustomer] = useState(null); // Customer details
  const [reservations, setReservations] = useState([]); // Reservations
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        // Step 1: Get customer ID using user ID
        const customerIdResponse = await axios.get(
          `http://localhost:3000/customers/${user.id}/user`,
          { withCredentials: true }
        );
        const customerId = customerIdResponse.data.id;

        // Step 2: Fetch customer details using the customer ID
        const customerResponse = await axios.get(
          `http://localhost:3000/customers/${customerId}`,
          { withCredentials: true }
        );
        setCustomer(customerResponse.data);

        // Step 3: Fetch reservations for the customer
        const reservationsResponse = await axios.get(
          `http://localhost:3000/reservations/${customerId}/customers`,
          { withCredentials: true }
        );
        setReservations(reservationsResponse.data);

        setLoading(false); // Loading complete
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchCustomerDetails();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  if (!customer) {
    return <div className="text-center text-xl text-red-500">Error loading profile data.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>

        {/* Personal Details */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {customer.name} {customer.surname}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone Number:</span> {customer.phone_number}
            </p>
            <p className="text-gray-700 col-span-2">
              <span className="font-semibold">SSN:</span> {customer.ssn}
            </p>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
          {reservations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservations.map((reservation, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{reservation.hotelName}</h3>
                  <p className="text-gray-700">
                    <span className="font-semibold">Room Type:</span> {reservation.roomType}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Arrival:</span>{" "}
                    {new Date(reservation.arrival_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Checkout:</span>{" "}
                    {new Date(reservation.checkout_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Cost:</span> ${reservation.cost}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">No reservations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
