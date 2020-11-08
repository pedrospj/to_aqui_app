import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/routes';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './src/store';

if (__DEV__) {
  import('./Reactotron').then(() => console.log('Reactotron Configured'));
}

const fill = {
  flex: 1,
};

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={fill}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </SafeAreaView>
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
