import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_BOOKINGS = gql`
  query {
    bookings {
      id
      name
      destination
      date
    }
  }
`;

const ADD_BOOKING = gql`
  mutation AddBooking($name: String!, $destination: String!, $date: String!) {
    addBooking(name: $name, destination: $destination, date: $date) {
      id
      name
      destination
      date
    }
  }
`;

const BookingSystem = () => {
  const [formData, setFormData] = useState({ name: "", destination: "", date: "" });

  const { loading, error, data } = useQuery(GET_BOOKINGS);

  const [addBooking] = useMutation(ADD_BOOKING, {
    refetchQueries: [{ query: GET_BOOKINGS }], // Ensures UI updates automatically
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.destination && formData.date) {
      await addBooking({ variables: formData });
      setFormData({ name: "", destination: "", date: "" });
    }
  };

  return (
    <div>
      <h2>Book a Trip</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} required />
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <button type="submit">Book</button>
      </form>

      <h2>Existing Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching bookings: {error.message}</p>
      ) : data?.bookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {data.bookings.map((booking) => (
            <li key={booking.id}>
              <strong>{booking.name}</strong> - {booking.destination} on {booking.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingSystem;
