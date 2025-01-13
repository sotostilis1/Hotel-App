import React, { useState } from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import axios from "axios";

const ReservationModal = ({ open, handleClose, hotelInfo, selectedRoomType, user }) => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalNightsBooked = () => {
    if (!dates[0].endDate) return 0;
    const timeDiff = dates[0].endDate - dates[0].startDate;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const getRoomCost = () => {
    const selectedRoom = hotelInfo.rooms.find((room) => room.type === selectedRoomType);
    return selectedRoom ? selectedRoom.cost : 0;
  };

  const handleReserve = async () => {
    if (!selectedRoomType) {
      alert("Please select a room type.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/customers/${user.id}/user`,
      { withCredentials: true }
      );
      const customerId = response.data.id;

      const reservationData = {
        hotelId: hotelInfo.id,
        customerId: customerId,
        roomType: selectedRoomType,
        nights: getTotalNightsBooked(),
        cost: getTotalNightsBooked() * getRoomCost(),
        arrival_date: dates[0].startDate,
        checkout_date: dates[0].endDate,
      };
      console.log("Reservation Details:", reservationData);

      await axios.post("http://localhost:3000/reservations",
       reservationData,
       { withCredentials: true });
      alert("Reservation successful!");
      handleClose();
    } catch (error) {
      console.error("Error creating reservation:", error.message);
      alert("Failed to reserve the room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          width: 400,
          margin: "auto",
          mt: 5,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Reserve {selectedRoomType} at {hotelInfo.name}
        </Typography>
        <Typography>Select Dates</Typography>
        <DateRange
          className="date-range"
          editableDateInputs={true}
          onChange={(item) => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          minDate={new Date()}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginY: 2,
          }}
        >
          <Typography fontWeight={"bold"}>Total Nights</Typography>
          <Typography>{getTotalNightsBooked()} nights</Typography>
        </Box>
        <Typography fontWeight={"bold"}>
          Total Cost: ${getTotalNightsBooked() * getRoomCost()}
        </Typography>
        <Button
          onClick={handleReserve}
          sx={{ width: "100%", marginTop: 2 }}
          variant="outlined"
          color="primary"
          disabled={!dates[0].endDate || isLoading}
        >
          {isLoading ? "Processing..." : "Reserve"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ReservationModal;
