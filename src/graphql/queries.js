import { gql } from "@apollo/client";



export const GET_BOOKINGS = gql`
  query {
    bookings {
      id
      name
      destination
      date
    }
  }
`;
