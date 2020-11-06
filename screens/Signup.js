import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firebase from "firebase";

export default Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({ ...signupForm, email, });
  };

  const onChangeTextPassword = (password) => {
    setSignupForm({ ...signupForm, password, });
  };

  const onChangeTextName = (name) => {
    setSignupForm({ ...signupForm, name, });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(signupForm.email, signupForm.password)
        .then((res) => {
          firebase
            .firestore()
            .collection("Users")
            .doc(res.user.uid)
            .set({
              uid: res.user.uid,
              email: res.user.email,
              name: signupForm.name,
            })
            .then(() => {
              console.log("New User Created!");
              Alert.alert("Sign up successful!");
              navigation.navigate("Login", {
                screen: "Riddles",
                params: { email: res.user.email },
              });
            })
            .catch((err) => {
              console.log(err);
              alert("Account not created, Error:", err.message);
            });
        })
        .catch((err) => alert(err.message));
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={onChangeTextEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={onChangeTextPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={onChangeTextName}
      />
      <TouchableOpacity style={styles.btn} onPress={createAccount}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={[styles.text, styles.smallText]}>Already have an account? Go to the login page below!</Text>
      <TouchableOpacity
        style={[styles.btn, styles.secondBtn]}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.text}>Go to Login</Text>
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
    fontSize: 30,
    padding: 17,
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