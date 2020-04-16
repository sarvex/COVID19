import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

export default function InputQuestion(props) {
  const [label, setLabel] = useState();

  useEffect(() => {
    setLabel(props.label);
  }, [props]);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.itemLabel}>
        {label}
        <Text style={{ fontWeight: "normal" }}>
          {props.item.answerRequired && "*"}
        </Text>
      </Text>

      <Dropdown
        fontSize={17}
        labelFontSize={0}
        dropdownOffset={{ top: 0 }}
        containerStyle={{ backgroundColor: "#fff", padding: 0, height: 30 }}
        animationDuration={400}
        value={props.answer || "Please select your answer"}
        textColor={"black"}
        baseColor={"#6a737d"}
        itemPadding={5}
        pickerStyle={{ borderRadius: 5 }}
        // itemTextStyle={{ fontWeight: 'bold' }}
        dropdownMargins={{ min: 16 }}
        itemCount={5}
        data={props.options}
        inputContainerStyle={{ borderBottomColor: "transparent" }}
        onChangeText={(value) =>
          props.handleDropdownChange({ ...props.item, answer: value })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "column",
  },
  itemLabel: {
    color: "gray",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "normal",
    position: "relative",
  },
});

// import React, { useEffect, useState } from "react";
// import { View } from "react-native";
// import { Dropdown } from "react-native-material-dropdown";

// export default function InputQuestion(props) {
//   const [label, setLabel] = useState();

//   useEffect(() => {
//     setLabel(props.label);
//   }, [props]);

//   return (
//     <View style={{ width: 350, marginLeft: 10 }}>
//       <Dropdown
//         fontSize={17}
//         labelFontSize={15}
//         label={label}
//         animationDuration={400}
//         value={props.answer || "Please select your answer"}
//         textColor={"black"}
//         baseColor={"#6a737d"}
//         containerStyle={{ width: "100%" }}
//         itemPadding={5}
//         itemCount={5}
//         data={props.options}
//         inputContainerStyle={{ borderBottomColor: "transparent" }}
//         onChangeText={value =>
//           props.handleDropdownChange({ ...props.item, answer: value })
//         }
//       />
//     </View>
//   );
// }
