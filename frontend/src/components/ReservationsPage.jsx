import React, { useEffect, useState } from "react";
import axios from "axios";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [customersMap, setCustomersMap] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");

  useEffect(() => {
    fetchAllReservations();
    fetchAllCustomers();
    fetchAllHotels();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reservations");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching all reservations:", error.message);
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      setCustomers(response.data);
      const map = {};
      response.data.forEach((cust) => {
        map[cust.id] = cust;
      });
      setCustomersMap(map);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  const fetchAllHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error.message);
    }
  };

  const handleCustomerChange = async (customerId) => {
    setSelectedCustomer(customerId);
    setSelectedHotel("");

    if (!customerId) {
      fetchAllReservations();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3000/reservations/${customerId}/customers`
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations by customer:", error.message);
      }
    }
  };

  const handleHotelChange = async (hotelId) => {
    setSelectedHotel(hotelId);
    setSelectedCustomer("");

    if (!hotelId) {
      fetchAllReservations();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:3000/reservations/${hotelId}/hotels`
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations by hotel:", error.message);
      }
    }
  };

  const formatDate = (isoString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>Reservations</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="customerFilter" style={{ marginRight: "10px", fontWeight: "bold" }}>
            Filter by Customer:
          </label>
          <select
            id="customerFilter"
            value={selectedCustomer}
            onChange={(e) => handleCustomerChange(e.target.value)}
            style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">All Customers</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="hotelFilter" style={{ marginRight: "10px", fontWeight: "bold" }}>
            Filter by Hotel:
          </label>
          <select
            id="hotelFilter"
            value={selectedHotel}
            onChange={(e) => handleHotelChange(e.target.value)}
            style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">All Hotels</option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Customer Last Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hotel Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Arrival Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Checkout Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Room Type</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Nights</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Cost</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            const {
              id,
              customer,
              hotelName,
              arrival_date,
              checkout_date,
              roomType,
              nights,
              cost,
            } = reservation;

            const customerInfo = customers.find((c) => c.id === customer) || {};
            return (
              <tr key={id} style={{ backgroundColor: "#fff", textAlign: "left" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{customerInfo.name || "N/A"}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{customerInfo.surname || "N/A"}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{hotelName}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{formatDate(arrival_date)}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{formatDate(checkout_date)}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{roomType}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{nights}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>${cost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsPage;
