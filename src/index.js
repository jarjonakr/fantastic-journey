import React from "react";
import ReactDOM from "react-dom";
import { ApolloLink } from "apollo-link";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import * as ActionCable from "@rails/actioncable";
import ActionCableLink from "graphql-ruby-client/subscriptions/ActionCableLink";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

const cache = new InMemoryCache();

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  );
};

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

const link = ApolloLink.split(
  hasSubscriptionOperation,
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
