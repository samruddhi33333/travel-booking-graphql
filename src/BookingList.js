import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKINGS } from "./graphql/queries";

const BookingList = () => {
  const { loading, error, data } = useQuery(GET_BOOKINGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.bookings.length === 0 ? (
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

export default BookingList;
