import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import BookingForm from "./BookingForm";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <h1>Travel Booking System</h1>
        <BookingForm />
      </div>
    </ApolloProvider>
  );
}

export default App;
