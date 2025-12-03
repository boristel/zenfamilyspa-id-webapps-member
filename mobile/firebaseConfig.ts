import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA0RUpIR2czzRaSYkXvGflBLOkGgDyy80Y",
    authDomain: "zenfamilyauthentic.firebaseapp.com",
    projectId: "zenfamilyauthentic",
    storageBucket: "zenfamilyauthentic.firebasestorage.app",
    messagingSenderId: "120918753452",
    appId: "1:120918753452:web:fff0e33bc6cfd62dc2df09",
    measurementId: "G-W6ZXQ5CQ92"
};

export const app = initializeApp(firebaseConfig);
// Use AsyncStorage for persistence in React Native
export const auth = getAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
