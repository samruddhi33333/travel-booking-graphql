const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID } = require("graphql");
const Booking = require("./models/Booking");

const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    destination: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bookings: {
      type: new GraphQLList(BookingType),
      resolve() {
        return Booking.find(); // Fetch all bookings
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBooking: {
      type: BookingType,
      args: {
        name: { type: GraphQLString },
        destination: { type: GraphQLString },
        date: { type: GraphQLString },
      },
      resolve(parent, args) {
        let booking = new Booking({
          name: args.name,
          destination: args.destination,
          date: args.date,
        });
        return booking.save();
      },
    },
    deleteBooking: {
      type: BookingType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        return await Booking.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
