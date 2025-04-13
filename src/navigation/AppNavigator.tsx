import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SliderScreen from '../screens/SliderScreen';
import CheckboxScreen from '../screens/CheckboxScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { ProfileProvider } from '../context/ProfileContext';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SwipesScreen from '../screens/SwipesScreen';



export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Slider: undefined;
  Checkbox: undefined;
  EditProfile: undefined;
  Matches: undefined;
  Swipes: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <ProfileProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Slider" component={SliderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Checkbox" component={CheckboxScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Matches" component={MatchesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Swipes" component={SwipesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </ProfileProvider>
  );
}
