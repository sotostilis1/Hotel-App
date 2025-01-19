# React and Backend Hotel Management App

## Overview

This project is a React-based frontend for a hotel management application, paired with a backend service to handle hotel data, user authentication, and reservations.

### Features
- **Login and User Management**: Users can log in, and their session is stored in the app.
- **Hotel Listings**: Displays a list of hotels retrieved from the backend.
- **Hotel Details**: View detailed information about specific hotels.
- **Customer Registration**: Register new customers in the system.
- **Profile Page**: View and manage user profile details.
- **Admin Page**: Access reservations and manage them.

---

## Frontend Setup

### Prerequisites
- Node.js installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the app at [http://localhost:3000](http://localhost:3000).

### Key Components
- `Navbar`: Navigation bar that adapts based on user state.
- `LogIn`: Handles user login functionality.
- `HotelList`: Displays a list of available hotels.
- `HotelDetails`: Shows detailed information about a specific hotel.
- `CustomerRegistration`: Form for registering new customers.
- `Profile`: User profile management.
- `ReservationsPage`: Admin view for managing reservations.

### Routing
The app uses `react-router-dom` for client-side routing:
- `/`: Login page.
- `/login`: Alternate route to the login page.
- `/hotels`: Displays the hotel list.
- `/hotels/:id`: Displays details of a specific hotel.
- `/customer_registration`: Customer registration form.
- `/profile`: User profile page.
- `/admin`: Admin reservations page.

---

## Backend Setup

### Prerequisites
- Node.js and a package manager (npm or yarn).
- A database system such as MongoDB, MySQL, or PostgreSQL.

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and configure:
   ```env
   PORT=3000
   DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
5. The backend will be available at [http://localhost:3000](http://localhost:3000).

### Endpoints
- `GET /hotels`: Fetch a list of hotels.
- `GET /hotels/:id`: Fetch details of a specific hotel.
- `POST /login`: Authenticate user credentials and return a session token.
- `POST /register`: Register a new customer.
- `GET /profile`: Retrieve user profile details.
- `GET /reservations`: Admin-only endpoint for managing reservations.

---

## Future Enhancements
- **User Authentication**: Implement role-based access control (e.g., admin vs. customer).
- **Enhanced Error Handling**: Improve error handling and display user-friendly messages.
- **Responsive Design**: Ensure the frontend is mobile-friendly.
- **Unit Testing**: Add test coverage for both frontend and backend.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---
