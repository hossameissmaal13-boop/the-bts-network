import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Welcome({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>مرحبا بك في تطبيق Smaal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, fontWeight: "bold" }
});