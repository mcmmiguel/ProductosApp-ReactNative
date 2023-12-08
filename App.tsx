import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation';
import { AuthProvider, ProductsProvider } from './src/context';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
