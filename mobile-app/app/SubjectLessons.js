import React, { useEffect, useMemo, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ServicesRow from "../src/components/ServicesRow";
import { getLessonContentsByLesson } from "../src/lessonContentsApi";
import { LanguageContext } from "../src/utils/LanguageContext";

export default function SubjectLessons({ navigation, route }) {
  const { language } = useContext(LanguageContext);
  const { subject, filiere, annee, student } = route.params || {};

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!subject?._id) return;
    const res = await getLessonContentsByLesson(subject._id);
    if (res.success) {
      setItems(res.items || []);
    }
  };

  const labels = useMemo(() => {
    if (language === "ar") {
      return {
        unavailable: "غير متوفر حاليا",
        cours: "الدروس",
        exercice: "التمارين",
        examen: "الامتحانات",
        tp: "الأشغال التطبيقية",
        firstYear: "السنة الأولى",
        secondYear: "السنة الثانية"
      };
    }

    if (language === "en") {
      return {
        unavailable: "Not available for now",
        cours: "Lessons",
        exercice: "Exercises",
        examen: "Exams",
        tp: "Practical Work",
        firstYear: "First year",
        secondYear: "Second year"
      };
    }

    return {
      unavailable: "Non disponible actuellement",
      cours: "Cours",
      exercice: "Exercices",
      examen: "Examens",
      tp: "Travaux Pratiques",
      firstYear: "Première année",
      secondYear: "Deuxième année"
    };
  }, [language]);

  const grouped = {
    cours: items.filter((i) => i.type === "cours"),
    exercice: items.filter((i) => i.type === "exercice"),
    examen: items.filter((i) => i.type === "examen"),
    tp: items.filter((i) => i.type === "tp")
  };

  const renderSection = (title, data) => (
    <View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {data.length === 0 ? (
        <Text style={styles.emptyText}>{labels.unavailable}</Text>
      ) : (
        data.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.itemBtn}
            onPress={() =>
              navigation.navigate("LessonDetails", {
                student,
                subject,
                filiere,
                annee,
                lessonItem: item
              })
            }
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#2563eb" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.mainTitle}>{subject?.title || "Matière"}</Text>
          <Text style={styles.subTitle}>
            {filiere} - {annee === "1" ? labels.firstYear : labels.secondYear}
          </Text>

          {renderSection(labels.cours, grouped.cours)}
          {renderSection(labels.exercice, grouped.exercice)}
          {renderSection(labels.examen, grouped.examen)}
          {renderSection(labels.tp, grouped.tp)}
        </ScrollView>

        <View style={styles.bottomBar}>
          <ServicesRow
            navigation={navigation}
            currentScreen="SubjectLessons"
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
  sectionBlock: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12
  },
  itemBtn: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#dbeafe"
  },
  itemText: {
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