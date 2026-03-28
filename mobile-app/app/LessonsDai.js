import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLessonsByFiliereAndAnnee } from "../src/lessonsApi";
import ServicesRow from "../src/components/ServicesRow";

export default function LessonsDai({ navigation, route }) {
  const student = route?.params?.student || null;
  const [firstYear, setFirstYear] = useState([]);
  const [secondYear, setSecondYear] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res1 = await getLessonsByFiliereAndAnnee("DAI", "1");
    const res2 = await getLessonsByFiliereAndAnnee("DAI", "2");

    if (res1.success) setFirstYear(res1.lessons || []);
    if (res2.success) setSecondYear(res2.lessons || []);
  };

  const renderSection = (title, lessons, annee) => (
    <View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {lessons.length === 0 ? (
        <Text style={styles.emptyText}>Aucune matière</Text>
      ) : (
        lessons.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.lessonBtn}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("SubjectLessons", {
                student,
                subject: item,
                filiere: "DAI",
                annee
              })
            }
          >
            <Text style={styles.lessonText}>{item.title}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Lessons DAI</Text>

          {renderSection(
            "Développement des Applications Informatiques - Première année",
            firstYear,
            "1"
          )}

          {renderSection(
            "Développement des Applications Informatiques - Deuxième année",
            secondYear,
            "2"
          )}
        </ScrollView>

        <View style={styles.bottomBar}>
          <ServicesRow
            navigation={navigation}
            currentScreen="LessonsDai"
            student={student}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6faff"
  },

  wrapper: {
    flex: 1
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 18
  },

  sectionBlock: {
    marginBottom: 26
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
    lineHeight: 24
  },

  lessonBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },

  lessonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563eb"
  },

  emptyText: {
    color: "#64748b",
    fontSize: 14
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