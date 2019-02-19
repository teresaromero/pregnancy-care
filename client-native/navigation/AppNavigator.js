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

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: `Pregnancy Care 🤰🏼`,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
        fontSize:15
      },
      headerRight: (
        <Button
          type="clear"
          icon={
            <Icon
              name="power-off"
              type="font-awesome"
              size={15}
              color="#FF3860"
            />
          }
          titleStyle={{ color: "#FF3860" }}
          onPress={() => this.handleLogOut()}
        />
      ),
      headerStyle: {
        backgroundColor: "#0393df"
      }
    })
  },
  Record: {
    screen: Record,
    navigationOptions: () => ({
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '100',
        fontSize:15
      },
      headerStyle: {
        backgroundColor: "#0393df"
      }
    })
  }
});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
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
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Calendar: {
      screen: CalendarScreen,
      navigationOptions: {
        tabBarLabel: "Calendar",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
