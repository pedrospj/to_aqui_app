import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/routes';

const fill = {
  flex: 1,
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={fill}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
