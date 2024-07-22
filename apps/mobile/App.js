import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import HomeScreen from "./src/Screens/HomeScreen";
import LoginScreen from "./src/Screens/LoginScreen";
import SignupScreen from "./src/Screens/SignupScreen";
import WelcomeScreen from "./src/Screens/WelcomeSreen";
// const queryClientOption: QueryClientConfig = {
//   defaultOptions: {
//     queries: { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 5 },
//   },
// };

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen} />
        <Stack.Screen name={"SIGNUP"} component={SignupScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});