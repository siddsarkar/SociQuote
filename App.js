/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/views/Home/HomeScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
