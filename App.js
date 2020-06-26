import * as React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddProductScreen from './src/screens/AddProductScreen';
import ProductListingScreen from './src/screens/ProductListingScreen';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="AddProduct">
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductListing"
        component={ProductListingScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
