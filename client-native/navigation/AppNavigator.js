import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import { SignIn } from "../screens/SignInScreen";
import { Home } from "../screens/HomeScreen";

import { Profile } from "../screens/ProfileScreen";
import { CalendarScreen } from "../screens/CalendarScreen";
import { Text, Header, Card, Button, Icon } from "react-native-elements";
import { Record } from "../screens/RecordScreen";

import { LogoutBtn } from "../components/LogoutBtn";

const headerStyle = {
  backgroundColor: "#01395c",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: `Pregnancy Care 🤰🏼`,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerRight: <LogoutBtn />,
      headerStyle: headerStyle
    })
  },
  Record: {
    screen: Record,
    navigationOptions: () => ({
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerStyle: headerStyle
    })
  }
});

export const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      headerTitle: `Pregnancy Care 🤰🏼`,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerRight: <LogoutBtn />,
      headerStyle: headerStyle
    })
  }
});

export const CalendarNavigator = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: () => ({
      headerTitle: `Pregnancy Care 🤰🏼`,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "black"
      },
      headerRight: <LogoutBtn />,
      headerStyle: headerStyle
    })
  }
});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={20} color={tintColor} />
        )
      }
    },
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarLabel: "Calendar",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={20} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#01395c"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
