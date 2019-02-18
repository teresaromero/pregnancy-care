import { AsyncStorage } from "react-native";
import AuthApi from "../lib/APIs/authApi";
import connect from 'react-redux'

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AuthApi.currentUser()
      .then(res => {
        if (res !== undefined) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
