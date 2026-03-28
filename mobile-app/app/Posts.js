import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation, route }) {
  const student = route?.params?.student || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2563eb" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>
        <Text style={styles.text}>Student: {student?.prenom || ""} {student?.nom || ""}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f6faff" },
  container: { padding: 20 },
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { color: "#2563eb", marginLeft: 6, fontWeight: "bold" },
  title: { fontSize: 26, fontWeight: "bold", color: "#0f172a", marginBottom: 12 },
  text: { fontSize: 15, color: "#64748b", marginBottom: 10 }
});