import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";

export default function Home({ navigation, route }) {
  const { language, setLanguage, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const [langDropdown, setLangDropdown] = useState(false);

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" }
  ];

  // ✅ الطالب جاي من login
  const student = route?.params?.student || {};

  const fullName = useMemo(() => {
    const nom = student?.nom || "";
    const prenom = student?.prenom || "";
    return `${prenom} ${nom}`.trim() || "Student";
  }, [student]);

  const firstLetter = useMemo(() => {
    if (student?.prenom) return student.prenom.charAt(0).toUpperCase();
    if (student?.nom) return student.nom.charAt(0).toUpperCase();
    return "S";
  }, [student]);

  const filieres = [
    { key: "EII", label: "EII" },
    { key: "DAI", label: "DAI" },
    { key: "TC", label: "TC" },
    { key: "CG", label: "CG" }
  ];

  const actions = [
    {
      title: t.homeAi || "AI",
      icon: <MaterialCommunityIcons name="robot-outline" size={28} color="#2563eb" />,
      onPress: () => navigation.navigate("Ai")
    },
    {
      title: t.homeLessons || "Lessons",
      icon: <Ionicons name="book-outline" size={28} color="#2563eb" />,
      onPress: () => navigation.navigate("Lessons")
    },
    {
      title: t.homeCommunication || "Communication",
      icon: <Ionicons name="chatbubble-ellipses-outline" size={28} color="#2563eb" />,
      onPress: () => navigation.navigate("Messages")
    },
    {
      title: t.homePosts || "Posts",
      icon: <Ionicons name="newspaper-outline" size={28} color="#2563eb" />,
      onPress: () => navigation.navigate("Posts")
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => setLangDropdown(!langDropdown)}
            style={styles.topIconBtn}
          >
            <Ionicons name="language" size={24} color="#0f172a" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={styles.avatarCircle}
          >
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={styles.topIconBtn}
          >
            <Feather name="settings" size={22} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* LANGUAGE DROPDOWN */}
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

        {/* WELCOME */}
        <View style={styles.welcomeBox}>
          <Text style={[styles.welcomeText, language === "ar" && { textAlign: "right" }]}>
            {t.homeWelcome || "Bienvenue"} <Text style={styles.nameText}>{fullName}</Text>
          </Text>

          <Text style={[styles.subText, language === "ar" && { textAlign: "right" }]}>
            {t.homeSubtitle || "Accédez rapidement à votre espace BTS"}
          </Text>
        </View>

        {/* FILIERES */}
        <Text style={styles.sectionTitle}>{t.homeFilieres || "Filières BTS"}</Text>

        <View style={styles.filiereGrid}>
          {filieres.map((item) => (
            <View key={item.key} style={styles.filiereCard}>
              <Text style={styles.filiereText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ACTIONS */}
        <Text style={styles.sectionTitle}>{t.homeServices || "Services"}</Text>

        <View style={styles.actionsGrid}>
          {actions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              activeOpacity={0.85}
              onPress={item.onPress}
            >
              <View style={styles.actionCircle}>{item.icon}</View>
              <Text style={styles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff"
  },

  container: {
    padding: 20,
    paddingBottom: 35
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18
  },

  topIconBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },

  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },

  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },

  dropdown: {
    alignSelf: "flex-start",
    width: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden"
  },

  langBtn: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f7"
  },

  langText: {
    fontSize: 15,
    color: "#0f172a"
  },

  welcomeBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8
  },

  nameText: {
    color: "#2563eb"
  },

  subText: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 14
  },

  filiereGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 26
  },

  filiereCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },

  filiereText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563eb"
  },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  actionItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 22
  },

  actionCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 10
  },

  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    textAlign: "center"
  }
});