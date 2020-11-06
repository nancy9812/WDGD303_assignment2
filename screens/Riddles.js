import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import firebase from "firebase";
import "@firebase/firestore";

export default Riddles = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(); //user info
  const [questions, setQuestions] = useState([]); //riddle questions
  const [answers, setAnswers] = useState([]); //riddle answers
  const [creators, setCreators] = useState([]); //riddle creators
  const [loading, setLoading] = useState(); //loading

  const getData = (uid) => {
    const userRef = firebase.firestore().collection("Users").doc(uid); //user collection ref by id doc
    const riddleRef = firebase.firestore().collection("Riddles").doc("riddleArray"); //riddles collection ref

    userRef.get().then(function (doc) {
      // if the user exist then grab data and place in const
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        setLoading(false); //don't leak the memory
        console.log("User doesn't exist.");
        // navigation.navigate("Login"); //redirect to login
      }
    });

    // set the riddle infos 
    riddleRef.get().then(function (doc) {
      if (doc.exists) {
        const riddleData = doc.data();
        setQuestions(riddleData.questions);
        setAnswers(riddleData.answers);
        setCreators(riddleData.creators);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        setLoading(false); //don't leak the memory
        console.log("Document doesn't exist.");
      }
    });
  };

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) { //check if user is logged in
          getData(user.uid);
        } else { //if not, go to login page
          setUserInfo(null);
          setLoading(false); //don't load
          navigation.navigate("Login"); //redirect to login
        }
      });
    });
    return isFocused;
  }, [userInfo, loading, navigation, questions]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator color="#ea5252" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>User Unknown.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.textTitle}>Riddle Me!</Text>
        <Text style={[styles.textTitle, styles.textSubTitle]}>Welcome, {userInfo.name}!</Text>

        {/* loop and display riddles question array */}
        {questions.map((riddle, i) => (
          <View key={i} style={styles.riddleView}>
            <Text style={styles.text}>
              {riddle}
            </Text>

            {/* click btn to view the answer */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Alert.alert(answers[i]);
              }}
            >
              <Text style={styles.text}>
                Answer
        </Text>
            </TouchableOpacity>

            {/* display the user that posted the riddle */}
            <Text style={styles.text}>Posted By: {creators[i]}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={[styles.btn, styles.secondBtn]}
          onPress={() => {
            navigation.navigate("SubmitRiddle");
          }}
        >
          <Text style={styles.text}>Submit a Riddle</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 70,
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Montserrat-Bold",
  },

  textSubTitle: {
    color: "#defdef",
    fontSize: 21,
    fontWeight: "500",
    fontStyle: "italic",
  },

  loading: {
    alignItems: "center",
    justifyContent: "center",
  },

  riddleView: {
    borderColor: "#97a0b4",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 17,
    margin: 17,
  },

  btn: {
    backgroundColor: "#ea5252",
    margin: 7,
    padding: 17,
    width: 200,
    borderRadius: 17,
    alignItems: "center",
    alignSelf: "center", //center the btn
    justifyContent: "center",
    flexDirection: "row",
  },

  secondBtn: {
    backgroundColor: "#97a0b4",
    width: 300,
    marginTop: 50,
    marginBottom: 70,
  },
});