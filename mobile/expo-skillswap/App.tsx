import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Screens
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import FindTutorsScreen from './screens/FindTutorsScreen';
import StudentDirectoryScreen from './screens/StudentDirectoryScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import { CampusMapScreen } from './screens/CampusMapScreen';
import ProfileScreen from './screens/ProfileScreen';
import CuratedMatchesScreen from './screens/CuratedMatchesScreen';
import TutorProfileScreen from './screens/TutorProfileScreen';
import ScholarlyCirclesScreen from './screens/ScholarlyCirclesScreen';
import PlatformControlsScreen from './screens/PlatformControlsScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import VerificationAnalyticsScreen from './screens/VerificationAnalyticsScreen';

// Theme
import { COLORS, FONTS } from './constants/theme';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  AdminTabs: undefined;
  Chat: { recipientId: string; recipientName: string };
  TutorProfile: { tutorId: string };
  CuratedMatches: undefined;
  ScholarlyCircles: undefined;
  PlatformControls: undefined;
  Compliance: undefined;
  VerificationAnalytics: undefined;
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  FindTutors: undefined;
  Directory: undefined;
  Messages: undefined;
  Map: undefined;
  Profile: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  PlatformControls: undefined;
  Compliance: undefined;
  VerificationAnalytics: undefined;
  AdminProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();

// Custom Tab Bar Icon with Label
function TabBarIcon({ name, focused, color, label }: { 
  name: keyof typeof Ionicons.glyphMap; 
  focused: boolean; 
  color: string;
  label: string;
}) {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons name={name} size={22} color={color} />
    </View>
  );
}

// Main User Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Dashboard':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'FindTutors':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'Directory':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return (
            <TabBarIcon 
              name={iconName} 
              focused={focused} 
              color={color}
              label={route.name}
            />
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="FindTutors" 
        component={FindTutorsScreen} 
        options={{ tabBarLabel: 'Tutors' }}
      />
      <Tab.Screen 
        name="Directory" 
        component={StudentDirectoryScreen}
        options={{ tabBarLabel: 'Directory' }}
      />
      <Tab.Screen 
        name="Messages" 
        component={ChatListScreen}
        options={{ tabBarLabel: 'Messages' }}
      />
      <Tab.Screen 
        name="Map" 
        component={CampusMapScreen}
        options={{ tabBarLabel: 'Map' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Admin Tabs
function AdminTabs() {
  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'AdminDashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'PlatformControls':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Compliance':
              iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
              break;
            case 'VerificationAnalytics':
              iconName = focused ? 'analytics' : 'analytics-outline';
              break;
            case 'AdminProfile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            default:
              iconName = 'grid-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <AdminTab.Screen 
        name="AdminDashboard" 
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <AdminTab.Screen 
        name="PlatformControls" 
        component={PlatformControlsScreen}
        options={{ tabBarLabel: 'Controls' }}
      />
      <AdminTab.Screen 
        name="Compliance" 
        component={ComplianceScreen}
        options={{ tabBarLabel: 'Compliance' }}
      />
      <AdminTab.Screen 
        name="VerificationAnalytics" 
        component={VerificationAnalyticsScreen}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <AdminTab.Screen 
        name="AdminProfile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </AdminTab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AdminTabs" component={AdminTabs} />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{ 
              headerShown: true, 
              headerTitle: '',
              headerBackTitle: 'Back',
              headerTintColor: COLORS.primary,
            }}
          />
          <Stack.Screen 
            name="TutorProfile" 
            component={TutorProfileScreen}
            options={{ 
              headerShown: true, 
              headerTitle: 'Tutor Profile',
              headerBackTitle: 'Back',
              headerTintColor: COLORS.primary,
            }}
          />
          <Stack.Screen 
            name="CuratedMatches" 
            component={CuratedMatchesScreen}
            options={{ 
              headerShown: true, 
              headerTitle: 'Curated Matches',
              headerBackTitle: 'Back',
              headerTintColor: COLORS.primary,
            }}
          />
          <Stack.Screen 
            name="ScholarlyCircles" 
            component={ScholarlyCirclesScreen}
            options={{ 
              headerShown: true, 
              headerTitle: 'Scholarly Circles',
              headerBackTitle: 'Back',
              headerTintColor: COLORS.primary,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
