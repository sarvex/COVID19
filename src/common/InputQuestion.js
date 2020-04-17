import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, TextInput } from "react-native";

const ios = {
  input: {
    color: "#20477D",
    textAlign: "left",
    fontSize: 20,
    height: 30
  }
};

const android = {
  input: {
    color: "#20477D",
    textAlign: "left",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 20,
    height: 30
  }
};

export default function InputQuestion(props) {
  const [text, setText] = useState();

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.itemLabel}>
        {props.label}
        <Text style={{ fontWeight: "normal" }}>
          {props.item.answerRequired && "*"}
        </Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder={props.description}
        onChangeText={value => setText(value)}
        onBlur={() => props.handleTextChange({ ...props.item, answer: text })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderColor: "black",
    borderBottomWidth: 0.4,
    margin: 5
  },
  itemLabel: {
    color: "black",
    textAlign: "left",
    fontSize: 17,
    marginBottom: 15,
    fontWeight: "bold",
    position: "relative"
  },
  ...Platform.select({
    ios,
    android
  })
});
