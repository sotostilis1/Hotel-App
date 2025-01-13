import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerRegistration = () => {
  const [formData, setFormData] = useState({
    ssn: "",
    name: "",
    surname: "",
    phone_number: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showMessage = (msg, type = "error") => {
    setMessage({ text: msg, type });
    setTimeout(() => {
      setMessage(null); // Clear the message after 3 seconds
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { ssn, name, surname, phone_number, username, password } = formData;

    if (!ssn || !name || !surname || !phone_number || !username || !password) {
      showMessage("All fields are required.", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/auth/register_customer",
        formData
      );

      setLoading(false);
      showMessage("Registration successful!", "success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error.response ? error.response.data : error.message);
      showMessage("Error registering customer.", "error");
    }
  };

  return (
    <div className="flex p-20 justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Customer Registration
        </h2>
        <div className="mb-4">
          <label htmlFor="ssn" className="block text-gray-700 font-semibold mb-2">
            SSN
          </label>
          <input
            id="ssn"
            name="ssn"
            type="text"
            placeholder="Enter your SSN"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.ssn}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your first name"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="surname" className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <input
            id="surname"
            name="surname"
            type="text"
            placeholder="Enter your last name"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-700 font-semibold mb-2">
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="text"
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition"
        >
          {loading ? "Processing..." : "Register"}
        </button>
        {message && (
          <div
            className={`mt-6 p-4 text-center rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRegistration;
