import React from "react";
import ReactDOM from "react-dom";
import { ApolloLink } from "apollo-link";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import * as ActionCable from "@rails/actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";
import App from "./App";
import "./index.css";
import env from "./environment";
import "bootstrap/dist/css/bootstrap.css";

const cable = ActionCable.createConsumer(env.WS_BASE_URL);

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: env.API_GQL_URL,
});

const link = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  new ActionCableLink({ cable }),
  httpLink
);

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
