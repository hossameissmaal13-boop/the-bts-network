import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Welcome({ navigation, route }) {
  const student = route?.params?.student ?? null;

  useEffect(() => {
    // نحافظو على student ونمشيو مباشرة للـ Home
    const timer = setTimeout(() => {
      navigation.replace("Home", { student });
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigation, student]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BTS Network</Text>

      <Text style={styles.text}>
        مرحبا {student?.prenom || ""}
      </Text>
      <ServicesRow
     navigation={navigation}
     currentScreen="LessonDetails"
     student={student}
/>

      <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10
  },

  text: {
    fontSize: 18,
    color: "#0f172a"
  }
});