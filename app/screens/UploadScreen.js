import React from "react";
import { StyleSheet, Modal, View } from "react-native";
import LottieView from "lottie-react-native";
function UploadScreen({ onDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          style={styles.animation}
          onAnimationFinish={onDone}
          source={require("../../assets/animation/done.json")}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  animation: {
    width: 250,
  },
});
export default UploadScreen;
