import React from "react";
import { Modal, ActivityIndicator, View, StyleSheet } from "react-native";

const SpinnerModal = ({ visible }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.loggingOutOuter}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};

export default SpinnerModal;

const styles = StyleSheet.create({
  loggingOutOuter: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .666)",
    justifyContent: "center"
  }
});
