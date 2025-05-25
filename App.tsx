import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import NavigationService from "./src/navigationService";
import { ApolloProvider } from '@apollo/client';
import client from './src/api/apolloClient';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationService />
      </ApolloProvider>
    </GestureHandlerRootView>
  );
}

export default App;
