import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";
import { deleteStudentAccount } from "../src/api";
import { removeToken } from "../src/utils/tokenManager";

export default function Settings({ navigation, route }) {
  const { language, setLanguage, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const student = route?.params?.student || {};
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const theme = darkMode
    ? {
        background: "#0f172a",
        section: "#1e293b",
        card: "#1e293b",
        softCard: "#334155",
        text: "#f8fafc",
        subText: "#cbd5e1",
        primary: "#60a5fa",
        badgeBg: "#2563eb",
        activeLangBg: "#1d4ed8",
        activeLangBorder: "#60a5fa",
        deleteBg: "#7f1d1d",
        deleteText: "#fecaca",
        logoutBg: "#dc2626"
      }
    : {
        background: "#f3f6fb",
        section: "#ffffff",
        card: "#ffffff",
        softCard: "#eef2f7",
        text: "#111827",
        subText: "#6b7280",
        primary: "#2563eb",
        badgeBg: "#3b82f6",
        activeLangBg: "#dbeafe",
        activeLangBorder: "#93c5fd",
        deleteBg: "#fee2e2",
        deleteText: "#dc2626",
        logoutBg: "#ef4444"
      };

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

  const isLibre =
    student?.typeBTS === "Libre" ||
    student?.typeBTS === "BTS Libre" ||
    student?.typeBTS === "LIBRE";

  const studentId = student?.studentId || student?.customId || student?.codeMassar || "—";

  const handleDeleteAccount = () => {
    Alert.alert(
      t.warning || "Warning",
      t.deleteAccountConfirm || "Are you sure you want to delete your account?",
      [
        { text: t.cancel || "Cancel", style: "cancel" },
        {
          text: t.delete || "Delete",
          style: "destructive",
          onPress: confirmDelete
        }
      ]
    );
  };

  const confirmDelete = async () => {
    try {
      setLoadingDelete(true);

      const id = student?._id;
      if (!id) {
        Alert.alert(t.error || "Error", "Student ID not found");
        return;
      }

      const res = await deleteStudentAccount(id);

      if (res?.success) {
        await removeToken();

        Alert.alert(
          t.success || "Success",
          t.accountDeleted || "Your account has been deleted",
          [
            {
              text: "OK",
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }]
                })
            }
          ]
        );
      } else {
        Alert.alert(t.error || "Error", res?.message || "Delete failed");
      }
    } catch (error) {
      Alert.alert(t.error || "Error", "Server problem");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* BACK */}
        <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.85}>
          <Ionicons name="arrow-back" size={22} color={theme.primary} />
          <Text style={[styles.backText, { color: theme.primary }]}>{t.back || "Back"}</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={[styles.headerCard, { backgroundColor: theme.section }]}>
          {student?.photo ? (
            <Image source={{ uri: student.photo }} style={styles.avatarImage} />
          ) : (
            <View style={[styles.avatarCircle, { backgroundColor: theme.badgeBg }]}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          )}

          <Text style={[styles.fullName, { color: theme.text }]}>{fullName}</Text>
          <Text style={[styles.idText, { color: theme.subText }]}>ID: {studentId}</Text>

          <View style={[styles.planBadge, { backgroundColor: theme.badgeBg }]}>
            <Text style={styles.planBadgeText}>
              {isLibre ? "BTS Libre" : "BTS Connecté"}
            </Text>
          </View>
        </View>

        {/* ACCOUNT */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>👤 {t.account || "Account"}</Text>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.label, { color: theme.subText }]}>Nom</Text>
                <Text style={[styles.value, { color: theme.text }]}>{student?.nom || "—"}</Text>

                <Text style={[styles.label, { color: theme.subText }]}>Prénom</Text>
                <Text style={[styles.value, { color: theme.text }]}>{student?.prenom || "—"}</Text>

                <Text style={[styles.label, { color: theme.subText }]}>Email</Text>
                <Text style={[styles.value, { color: theme.text }]}>{student?.email || "—"}</Text>
              </View>

              <TouchableOpacity
                style={[styles.editBtn, { backgroundColor: theme.primary }]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("EditAccount", { student })}
              >
                <Feather name="edit-2" size={18} color="#fff" />
                <Text style={styles.editBtnText}>{t.edit || "Edit"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SECURITY */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🔐 {t.security || "Security"}</Text>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.softCard }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("ChangePassword", { student })}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>
              {t.changePassword || "Change Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.softCard }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("ForgotPassword", { from: "Settings", student })}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>
              {t.forgotPassword || "Forgot Password"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LANGUAGE */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🌍 {t.language || "Language"}</Text>

          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: language === "fr" ? theme.activeLangBg : theme.softCard,
                borderWidth: language === "fr" ? 1 : 0,
                borderColor: language === "fr" ? theme.activeLangBorder : "transparent"
              }
            ]}
            onPress={() => setLanguage("fr")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.optionText,
                { color: language === "fr" ? "#fff" : theme.text },
                language === "fr" && styles.activeLangText
              ]}
            >
              Français
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: language === "en" ? theme.activeLangBg : theme.softCard,
                borderWidth: language === "en" ? 1 : 0,
                borderColor: language === "en" ? theme.activeLangBorder : "transparent"
              }
            ]}
            onPress={() => setLanguage("en")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.optionText,
                { color: language === "en" ? "#fff" : theme.text },
                language === "en" && styles.activeLangText
              ]}
            >
              English
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: language === "ar" ? theme.activeLangBg : theme.softCard,
                borderWidth: language === "ar" ? 1 : 0,
                borderColor: language === "ar" ? theme.activeLangBorder : "transparent"
              }
            ]}
            onPress={() => setLanguage("ar")}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.optionText,
                { color: language === "ar" ? "#fff" : theme.text },
                language === "ar" && styles.activeLangText
              ]}
            >
              العربية
            </Text>
          </TouchableOpacity>
        </View>

        {/* NOTIFICATIONS */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🔔 {t.notifications || "Notifications"}</Text>

          <View style={styles.cardRow}>
            <Text style={[styles.optionText, { color: theme.text }]}>
              {t.receiveNotifications || "Receive Notifications"}
            </Text>
            <Switch
              value={receiveNotifications}
              onValueChange={setReceiveNotifications}
              trackColor={{ false: "#d1d5db", true: "#bfdbfe" }}
              thumbColor={receiveNotifications ? theme.primary : "#f4f4f5"}
            />
          </View>
        </View>

        {/* PLAN */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎓 {t.myPlan || "My Plan"}</Text>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.planText, { color: theme.subText }]}>
              {isLibre
                ? "Upgrade to BTS Connecté to unlock communication"
                : "You are using BTS Connecté"}
            </Text>
          </View>
        </View>

        {/* APPEARANCE */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🎨 {t.appearance || "Appearance"}</Text>

          <View style={styles.cardRow}>
            <Text style={[styles.optionText, { color: theme.text }]}>
              {t.darkMode || "Dark Mode"}
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#d1d5db", true: "#bfdbfe" }}
              thumbColor={darkMode ? theme.primary : "#f4f4f5"}
            />
          </View>
        </View>

        {/* ABOUT */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>ℹ️ {t.about || "About"}</Text>

          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <Text style={[styles.aboutText, { color: theme.subText }]}>Developed by Houssam Smaal</Text>
            <Text style={[styles.aboutText, { color: theme.subText }]}>Version 1.0</Text>
          </View>
        </View>

        {/* DANGER */}
        <View style={[styles.section, { backgroundColor: theme.section }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>⚠️ {t.dangerZone || "Danger Zone"}</Text>

          <TouchableOpacity
            style={[styles.deleteBtn, { backgroundColor: theme.deleteBg }]}
            activeOpacity={0.85}
            onPress={handleDeleteAccount}
            disabled={loadingDelete}
          >
            <Text style={[styles.deleteBtnText, { color: theme.deleteText }]}>
              {loadingDelete
                ? (t.loading || "Loading...")
                : (t.deleteAccount || "Delete Account")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.softCard }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Report", { from: "Settings", student })}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>
              {t.reportProblem || "Report Problem"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: theme.logoutBg }]}
          activeOpacity={0.85}
          onPress={handleLogout}
        >
          <Text style={styles.logoutBtnText}>{t.logout || "Logout"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  container: {
    padding: 18,
    paddingBottom: 40
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },

  backText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "700"
  },

  headerCard: {
    borderRadius: 26,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 18
  },

  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14
  },

  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 14
  },

  avatarText: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold"
  },

  fullName: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 4
  },

  idText: {
    fontSize: 15,
    marginBottom: 12
  },

  planBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14
  },

  planBadgeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700"
  },

  section: {
    borderRadius: 22,
    padding: 16,
    marginBottom: 16
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 14
  },

  card: {
    backgroundColor: "transparent"
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },

  label: {
    fontSize: 15,
    marginBottom: 4
  },

  value: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 14
  },

  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center"
  },

  editBtnText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6
  },

  optionCard: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12
  },

  optionText: {
    fontSize: 15
  },

  activeLangText: {
    fontWeight: "700"
  },

  cardRow: {
    backgroundColor: "transparent",
    borderRadius: 18,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  planText: {
    fontSize: 15,
    lineHeight: 24
  },

  aboutText: {
    fontSize: 15,
    lineHeight: 24
  },

  deleteBtn: {
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12
  },

  deleteBtnText: {
    fontSize: 15,
    fontWeight: "700"
  },

  logoutBtn: {
    borderRadius: 18,
    paddingVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8
  },

  logoutBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800"
  }
});