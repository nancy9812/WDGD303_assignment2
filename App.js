import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Riddles from "./screens/Riddles";
import SubmitRiddle from "./screens/SubmitRiddle";

import firebase from "firebase";
import "@firebase/firestore";


const [loaded] = useFonts({
  Montserrat: require('./assets/fonts/Montserrat-Bold.otf'),
});

const firebaseConfig = {
  apiKey: "AIzaSyC0ulR0QlbEdxU20jsaLyGjIPN99IuN4BA",
  authDomain: "wdgd-303-assign2.firebaseapp.com",
  databaseURL: "https://wdgd-303-assign2.firebaseio.com",
  projectId: "wdgd-303-assign2",
  storageBucket: "wdgd-303-assign2.appspot.com",
  messagingSenderId: "998475824107",
  appId: "1:998475824107:web:7af52650f48c9ce07137ae"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();

// sign out button on sidebar
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Sign out Success!");
              props.navigation.closeDrawer();
            })
            .catch((err) => alert(err.message));
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen name="Riddles" component={Riddles} />
      <Drawer.Screen name="SubmitRiddle" component={SubmitRiddle} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
