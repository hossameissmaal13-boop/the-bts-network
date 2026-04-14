import React, { useContext, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";
import { changeStudentPassword } from "../src/api";

export default function ChangePassword({ navigation, route }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const student = route?.params?.student || null;

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [loading, setLoading] = useState(false);

  const oldRef = useRef(null);
  const newRef = useRef(null);
  const confirmRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const focusBack = (ref) => {
    setTimeout(() => {
      ref.current?.focus();
    }, 80);
  };

  const handleSubmit = async () => {
    if (!student?._id) {
      Alert.alert(t.error || "Error", "Student not found");
      return;
    }

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      Alert.alert(t.error || "Error", t.fillAllFields || "Fill all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert(t.error || "Error", t.codesDoNotMatch || "Passwords do not match");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      Alert.alert(t.error || "Error", "New password must be different");
      return;
    }

    try {
      setLoading(true);

      const res = await changeStudentPassword(student._id, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      });

      if (res?.success) {
        Alert.alert(
          t.success || "Success",
          res.message || "Password changed successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert(
          t.error || "Error",
          res?.message || "Change password failed"
        );
      }
    } catch (error) {
      Alert.alert(t.error || "Error", "Server problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#2563eb" />
            <Text style={styles.backText}>{t.back || "Back"}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{t.changePassword || "Change Password"}</Text>
          <Text style={styles.subtitle}>
            Enter your old password, then choose a new one.
          </Text>

          <Text style={styles.label}>Old Password</Text>
          <TouchableOpacity activeOpacity={1} style={[styles.inputWrapper, focusField === "oldPassword" && styles.focused]}>
            <TextInput
              ref={oldRef}
              value={formData.oldPassword}
              onChangeText={(v) => handleChange("oldPassword", v)}
              secureTextEntry={!showOld}
              style={styles.codeInput}
              placeholder="Old password"
              autoCapitalize="none"
              onFocus={() => setFocusField("oldPassword")}
              onBlur={() => setFocusField(null)}
            />
            <TouchableOpacity
              onPress={() => {
                setShowOld((prev) => !prev);
                focusBack(oldRef);
              }}
            >
              <Ionicons name={showOld ? "eye" : "eye-off"} size={22} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.label}>New Password</Text>
          <TouchableOpacity activeOpacity={1} style={[styles.inputWrapper, focusField === "newPassword" && styles.focused]}>
            <TextInput
              ref={newRef}
              value={formData.newPassword}
              onChangeText={(v) => handleChange("newPassword", v)}
              secureTextEntry={!showNew}
              style={styles.codeInput}
              placeholder="New password"
              autoCapitalize="none"
              onFocus={() => setFocusField("newPassword")}
              onBlur={() => setFocusField(null)}
            />
            <TouchableOpacity
              onPress={() => {
                setShowNew((prev) => !prev);
                focusBack(newRef);
              }}
            >
              <Ionicons name={showNew ? "eye" : "eye-off"} size={22} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.label}>Confirm Password</Text>
          <TouchableOpacity activeOpacity={1} style={[styles.inputWrapper, focusField === "confirmPassword" && styles.focused]}>
            <TextInput
              ref={confirmRef}
              value={formData.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              secureTextEntry={!showConfirm}
              style={styles.codeInput}
              placeholder="Confirm password"
              autoCapitalize="none"
              onFocus={() => setFocusField("confirmPassword")}
              onBlur={() => setFocusField(null)}
            />
            <TouchableOpacity
              onPress={() => {
                setShowConfirm((prev) => !prev);
                focusBack(confirmRef);
              }}
            >
              <Ionicons name={showConfirm ? "eye" : "eye-off"} size={22} color="#666" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? (t.loading || "Loading...") : (t.validate || "Validate")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f6faff" },
  container: { padding: 20, paddingBottom: 50 },
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  backText: { marginLeft: 6, color: "#2563eb", fontSize: 16, fontWeight: "700" },
  title: { fontSize: 24, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  subtitle: { color: "#64748b", fontSize: 14, lineHeight: 22, marginBottom: 24 },
  label: { marginBottom: 6, fontWeight: "700", color: "#111827" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#dbe2ea",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff"
  },
  codeInput: { flex: 1, paddingVertical: 14, color: "#111827" },
  focused: { borderColor: "#2563eb" },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 }
});