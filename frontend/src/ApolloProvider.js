// src/ApolloProvider.js

import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as Provider , createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from './components/AuthContext';

const link = "http://localhost:8000/graphql";
const httpLink = createHttpLink({
  uri: link
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log("token: ", token);
  const BearerToken = token ? `Bearer ${token}` : "";

  return {
    headers: {
      ...headers,
      authorization: BearerToken,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => {
  return <Provider client={client}>
    <AuthProvider>{children}</AuthProvider>
    </Provider>;
};

export default ApolloProvider;
