import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  Feather
} from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";
import ServicesRow from "../src/components/ServicesRow";

export default function Home({ navigation, route }) {
  const { language, setLanguage, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const [langDropdown, setLangDropdown] = useState(false);

  const student = route?.params?.student ?? null;

  const fullName = useMemo(() => {
    if (!student) return "";
    const nom = student?.nom || "";
    const prenom = student?.prenom || "";
    return `${prenom} ${nom}`.trim();
  }, [student]);

  const firstLetter = useMemo(() => {
    if (student?.prenom) return student.prenom.charAt(0).toUpperCase();
    if (student?.nom) return student.nom.charAt(0).toUpperCase();
    return "S";
  }, [student]);

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" }
  ];

  // ✅ كل شعبة مربوطة بصفحتها
  const filieres = [
    { key: "EII", label: "EII", icon: "flash-outline", screen: "LessonsEii" },
    { key: "DAI", label: "DAI", icon: "laptop-outline", screen: "LessonsDai" },
    { key: "TC", label: "TC", icon: "briefcase-outline", screen: "LessonsTc" },
    { key: "CG", label: "CG", icon: "calculator-outline", screen: "LessonsCg" }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => setLangDropdown(!langDropdown)}
              style={styles.topIconBtn}
              activeOpacity={0.85}
            >
              <Ionicons name="language" size={24} color="#0f172a" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Settings", { student })}
              style={styles.topIconBtn}
              activeOpacity={0.85}
            >
              <Feather name="settings" size={22} color="#0f172a" />
            </TouchableOpacity>
          </View>

          {/* LANGUAGE */}
          {langDropdown && (
            <View style={styles.dropdown}>
              {languages.map((l) => (
                <TouchableOpacity
                  key={l.code}
                  style={styles.langBtn}
                  onPress={() => {
                    setLanguage(l.code);
                    setLangDropdown(false);
                  }}
                >
                  <Text style={styles.langText}>{l.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* HERO */}
          <View style={styles.heroCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.bigAvatarCircle}>
                <Text style={styles.bigAvatarText}>{firstLetter}</Text>
              </View>
            </View>

            <View style={styles.heroTextBox}>
              <Text style={styles.welcomeText}>
                {t.homeWelcome || "Bienvenue"}
              </Text>

              <Text style={styles.fullNameText}>
                {fullName || "Student"}
              </Text>

              <Text style={styles.subText}>
                {t.homeSubtitle || "Accédez rapidement à votre espace BTS"}
              </Text>
            </View>
          </View>
        
          {/* FILIERES */}
          <Text style={styles.sectionTitle}>
            {t.homeFilieres || "Filières BTS"}
          </Text>

          <View style={styles.filiereGrid}>
            {filieres.map((item) => (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.85}
                style={styles.filiereCard}
                onPress={() => navigation.navigate(item.screen, { student })}
              >
                <Ionicons name={item.icon} size={22} color="#2563eb" />
                <Text style={styles.filiereText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        
        </ScrollView>

        {/* SERVICES BAR */}
        <View style={styles.bottomBar}>
          <ServicesRow
       navigation={navigation}
       currentScreen="Home"
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

  container: {
    padding: 20
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },

  topIconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3
  },

  dropdown: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16
  },

  langBtn: {
    padding: 12
  },

  langText: {
    fontSize: 15
  },

  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center"
  },

  avatarWrapper: {
    marginRight: 16
  },

  heroTextBox: {
    flex: 1
  },

  bigAvatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center"
  },

  bigAvatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold"
  },

  welcomeText: {
    fontSize: 16,
    color: "#64748b"
  },

  fullNameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a"
  },

  subText: {
    color: "#64748b",
    fontSize: 13
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14
  },

  filiereGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  filiereCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginBottom: 12
  },

  filiereText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#2563eb"
  },

  bottomBar: {
    backgroundColor: "#fff",
    padding: 12
  }
});