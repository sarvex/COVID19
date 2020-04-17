import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

var radio_props = [];

export default function YesNoQuestion(props) {
  radio_props = [...props.item.options];
  const temp = props.item.answer;

  const handleChange = value => {
    props.handleChangeAnswer({ ...props.item, answer: value });
  };
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.itemLabel}>
        {props.label}
        <Text style={{ fontWeight: "normal" }}>
          {props.item.answerRequired && "*"}
        </Text>
      </Text>
      <RadioForm formHorizontal={false} animation={true}>
        {/* To create radio buttons, loop through your array of options */}
        {radio_props.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            {/*  You can set RadioButtonLabel before RadioButtonInput */}
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={props.item.answer === obj.value}
              onPress={() => handleChange(obj.value)}
              borderWidth={2}
              buttonInnerColor={"#20477D"}
              buttonOuterColor={"#20477D"}
              buttonSize={10}
              buttonOuterSize={22}
              buttonStyle={{ marginTop: 5 }}
              buttonWrapStyle={{ marginRight: 0 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={() => handleChange(obj.value)}
              labelStyle={{ fontSize: 15, color: "black", marginTop: 5 }}
              labelWrapStyle={{ marginRight: 20 }}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    flexDirection: "column"
  },
  itemLabel: {
    color: "grey",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 5
  }
});
