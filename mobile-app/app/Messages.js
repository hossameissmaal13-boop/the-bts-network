import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LanguageContext } from "../src/utils/LanguageContext";
import ServicesRow from "../src/components/ServicesRow";

export default function Messages({ navigation, route }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;
  const student = route?.params?.student || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{t.homeCommunication || "Communication"}</Text>

          <View style={styles.card}>
            <Text style={styles.text}>Communication page coming soon...</Text>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <ServicesRow
            navigation={navigation}
            currentScreen="Messages"
            student={student}
            t={t}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f6faff" },
  container: { padding: 20, paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#0f172a", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20
  },
  text: { color: "#64748b", fontSize: 15 },
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