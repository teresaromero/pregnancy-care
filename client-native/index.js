import React from "react";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import App from './App';

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://pregnancy-care.herokuapp.com/grapghql",
    credentials: "include"
  }),
  cache: new InMemoryCache()
});

export const MainApp = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

registerRootComponent(MainApp);
