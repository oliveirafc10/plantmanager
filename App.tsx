import React from 'react';
import Routes from './src/routes';
import AppLoading from 'expo-app-loading';
import { 
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
 } from '@expo-google-fonts/roboto';

export default function App(){
  const [ fontsLoaded ] =useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_900Black
  });

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <Routes />
  )
}