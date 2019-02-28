import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/grapghql"
      : "http://localhost:3000/grapghql",
  credentials: "include"
});
