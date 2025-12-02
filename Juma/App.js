import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './src/screens/LoadingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import PlaceDetailScreen from './src/screens/PlaceDetailScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  const [phone, setPhone] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Loading">
            {props => (
              <LoadingScreen
                {...props}
                onComplete={() => props.navigation.replace('Onboarding')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Onboarding">
            {props => (
              <OnboardingScreen
                {...props}
                onComplete={() => props.navigation.replace('Phone')}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Phone">
            {props => (
              <PhoneNumberScreen
                {...props}
                onSubmit={(p) => {
                  setPhone(p);
                  props.navigation.replace('Otp');
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Otp">
            {props => (
              <OtpVerificationScreen
                {...props}
                phone={phone}
                onVerify={() => props.navigation.replace('Profile')}
                onBack={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Profile">
            {props => (
              <UserProfileScreen
                {...props}
                onSubmit={(profile) => {
                  setUserProfile(profile);
                  props.navigation.replace('Home');
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} userProfile={userProfile} />}
          </Stack.Screen>

          <Stack.Screen
            name="PlaceDetailScreen"
            component={PlaceDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </View>
  );
}
