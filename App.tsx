import React from 'react';
import NavigationService from "./src/navigationService";
import { ApolloProvider } from '@apollo/client';
import client from './src/api/apolloClient';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <NavigationService />
    </ApolloProvider>
  );
}

export default App;
