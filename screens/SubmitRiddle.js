import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import firebase from "firebase";
import "@firebase/firestore";

export default SubmitRiddle = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(); //user info
  const [question, setQuestion] = useState(""); //riddle questions
  const [answer, setAnswer] = useState(""); //riddle answers
  const [creator, setCreator] = useState(""); //riddle creator
  const [questions, setQuestions] = useState([]); //riddle questions array
  const [answers, setAnswers] = useState([]); //riddle answers array
  const [creators, setCreators] = useState([]); //riddle creators array
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
      }
      else {
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

  const addRiddle = () => {
    setCreator(userInfo.name); // set the creator name as the user's name

    // console the new riddle inputs
    console.log("New Riddle Question: ", question);
    console.log("New Riddle Answer: ", answer);
    console.log("CreatorSan: ", creator);

    // make sure that the input fields are not empty
    if (question === "") {
      Alert.alert("Please enter the riddle");
      return;
    } 

    if (answer === "") {
      Alert.alert("Please enter the answer to the riddle");
      return;
    }

    // push the riddle question, answer, and creator to the arrays
    questions.push(question);
    answers.push(answer);
    creators.push(creator);

    Alert.alert("Riddle added!"); // Let the user know that the riddle was added successfully
    setQuestion("");
    setAnswer("");
    navigation.navigate("Riddles"); // redirect to the riddles page

    // append(merge) data to firestore database
    return firebase.firestore().collection("Riddles").doc("riddleArray").set({
      questions: questions,
      answers: answers,
      creators: creators,
    }, { merge: true });
  
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
  }, [userInfo, loading, navigation]);

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
      <Text style={styles.textTitle}>Submit A Riddle</Text>

      {/* get input from user */}
      <TextInput
        style={styles.textInput}
        placeholder={"Riddle Question"}
        placeholderTextColor={"#97a0b4"}
        onChangeText={setQuestion}
        value={question}
      />
      <TextInput
        style={styles.textInput}
        placeholder={"Riddle Answer"}
        placeholderTextColor={"#97a0b4"}
        onChangeText={setAnswer}
        value={answer}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={addRiddle}
      >
        <Text style={styles.text}>Submit Riddle</Text>
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

  textTitle: {
    color: "#ea5252",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 17,
  },

  riddleView: {
    borderColor: "#97a0b4",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 17,
    margin: 17,
  },

  textInput: {
    backgroundColor: "#defdef",
    padding: 20,
    width: 300,
    borderRadius: 17,
    margin: 17,
  },

  btn: {
    backgroundColor: "#ea5252",
    marginTop: 17,
    padding: 17,
    width: 300,
    borderRadius: 17,
    alignItems: "center",
    alignSelf: "center", //center the btn
    justifyContent: "center",
    flexDirection: "row",
  },
});