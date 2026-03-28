import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ServicesRow from "../src/components/ServicesRow";

export default function LessonDetails({ navigation, route }) {
  const { subject, lessonItem, filiere, annee, student } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#2563eb" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.mainTitle}>{lessonItem?.title || "Contenu"}</Text>
          <Text style={styles.subTitle}>
            {subject?.title} - {filiere} - {annee === "1" ? "Première année" : "Deuxième année"}
          </Text>

          <View style={styles.contentBox}>
            <Text style={styles.contentText}>
              {lessonItem?.content || "Non disponible actuellement"}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <ServicesRow
            navigation={navigation}
            currentScreen="LessonDetails"
            student={student}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f6faff" },
  wrapper: { flex: 1 },
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14
  },
  backText: {
    color: "#2563eb",
    marginLeft: 6,
    fontWeight: "bold"
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6
  },
  subTitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 18
  },
  contentBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#dbeafe"
  },
  contentText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#334155"
  },
  bottomBar: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8
  }
});