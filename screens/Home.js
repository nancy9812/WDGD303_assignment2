import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textTitle]}>Riddle Me!</Text>
      <Text style={styles.text}>Test yourself and see how many riddles you can solve! Think you can riddle me better, then submit your own riddles!</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.secondBtn]}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.text}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

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

  textTitle: {
    color: "#ea5252",
    padding: 17,
    fontSize: 30,
    fontWeight: "700",
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
  },
});