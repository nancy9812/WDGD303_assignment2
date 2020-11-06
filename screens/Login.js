import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "firebase";

export default Login = ({ navigation }) => {

  const [loginForm, setLoginForm] = useState({
    // temp testing so don't need to keep putting in form info
    // email: "test@email.com",
    // password: "password",
  });

  // set login email
  const onChangeTextEmail = (email) => {
    setLoginForm({ ...loginForm, email, });
  };

  // set login password
  const onChangeTextPassword = (password) => {
    setLoginForm({ ...loginForm, password, });
  };

  // sign into firebase user and redirect to riddles page
  const loginHandler = () => {
    // make sure that the input fields are not empty
    if (loginForm.email === undefined) {
      Alert.alert("Please enter your email");
      return;
    }
    if (loginForm.password === undefined) {
      Alert.alert("Please enter your password");
      return;
    }
    return new Promise(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then((res) => {
          navigation.navigate("Riddles");
          console.log("Login Success!");
        })
        .catch((err) => {alert(err.message)}); //if there's an error logging in: alert me
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Login to Riddle Me!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={loginForm.email}
        onChangeText={onChangeTextEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginForm.password}
        secureTextEntry
        onChangeText={onChangeTextPassword}
      />
      <TouchableOpacity style={styles.btn} onPress={loginHandler}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <Text style={[styles.text, styles.smallText]}>Don't have an account? Sign up for one below!</Text>
      <TouchableOpacity
        style={[styles.btn, styles.secondBtn]}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.text}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 70,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#defdef",
    fontSize: 17,
    textAlign: "center",
  },

  smallText: {
    fontSize: 12,
    marginTop: 17,
  },

  textTitle: {
    color: "#ea5252",
    padding: 17,
    fontSize: 30,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#defdef",
    padding: 20,
    marginTop: 17,
    width: 300,
    borderRadius: 17,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#97a0b4",
    borderRadius: 17,
    marginTop: 17,
    padding: 20,
    width: 300,
  },

  secondBtn: {
    backgroundColor: "#ea5252",
    marginTop: 5,
  },
});