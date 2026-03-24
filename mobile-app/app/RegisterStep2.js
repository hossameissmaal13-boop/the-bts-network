import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";

export default function RegisterStep2({ navigation, route }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const step1Data = route.params?.formData || {};
  const typeBTS = route.params?.typeBTS;

  const [formData, setFormData] = useState({
    email: "",
    code: "",
    confirmCode: ""
  });

  const [showCode, setShowCode] = useState(false);
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [focusField, setFocusField] = useState(null);

  const codeRef = useRef(null);
  const confirmRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const focusBack = (ref) => {
    setTimeout(() => {
      ref.current?.focus();
    }, 80);
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.code || !formData.confirmCode) {
      Alert.alert(t.error, t.fillAllFields || "Fill all fields");
      return;
    }

    if (formData.code !== formData.confirmCode) {
      Alert.alert(t.error, t.codesDoNotMatch || "Codes do not match");
      return;
    }

    const payload = {
      nomFr: step1Data.nomFr,
      prenomFr: step1Data.prenomFr,
      codeMassar: step1Data.codeMassar,
      email: formData.email.trim().replace(/\s+/g, "").toLowerCase(),
      password: formData.code
    };

    try {
      console.log("📤 Sending to backend:", payload);

      const res = await fetch("https://the-bts-network-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      console.log("📥 REGISTER RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        Alert.alert(t.error, t.serverProblem);
        return;
      }

      if (data.success) {
        Alert.alert(t.success, t.registrationComplete || "Registration complete!");
        navigation.replace("Welcome");
      } else {
        Alert.alert(t.error, data.message || "Registration failed");
      }

    } catch (error) {
      console.log("❌ REGISTER ERROR:", error);
      Alert.alert(t.error, t.serverProblem);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* BACK */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2e86de" />
          <Text style={styles.backText}>{t.back}</Text>
        </TouchableOpacity>

        {/* PROGRESS */}
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
        </View>

        <Text style={styles.title}>{t.registerTitle}</Text>

        {/* EMAIL */}
        <Text style={styles.label}>{t.email}</Text>
        <TextInput
          value={formData.email}
          onChangeText={(v) => handleChange("email", v)}
          style={[styles.input, focusField === "email" && styles.focused]}
          placeholder={t.gmailPlaceholder}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusField("email")}
          onBlur={() => setFocusField(null)}
        />

        {/* CODE */}
        <Text style={styles.label}>{t.code}</Text>
        <View style={[styles.inputWrapper, focusField === "code" && styles.focused]}>
          <TextInput
            ref={codeRef}
            value={formData.code}
            onChangeText={(v) => handleChange("code", v)}
            secureTextEntry={!showCode}
            style={styles.codeInput}
            placeholder={t.code}
            autoCapitalize="none"
            onFocus={() => setFocusField("code")}
            onBlur={() => setFocusField(null)}
          />
          <TouchableOpacity
            onPressIn={() => {
              setShowCode((prev) => !prev);
              focusBack(codeRef);
            }}
          >
            <Ionicons name={showCode ? "eye" : "eye-off"} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* CONFIRM CODE */}
        <Text style={styles.label}>{t.confirmCode}</Text>
        <View style={[styles.inputWrapper, focusField === "confirmCode" && styles.focused]}>
          <TextInput
            ref={confirmRef}
            value={formData.confirmCode}
            onChangeText={(v) => handleChange("confirmCode", v)}
            secureTextEntry={!showConfirmCode}
            style={styles.codeInput}
            placeholder={t.confirmCode}
            autoCapitalize="none"
            onFocus={() => setFocusField("confirmCode")}
            onBlur={() => setFocusField(null)}
          />
          <TouchableOpacity
            onPressIn={() => {
              setShowConfirmCode((prev) => !prev);
              focusBack(confirmRef);
            }}
          >
            <Ionicons name={showConfirmCode ? "eye" : "eye-off"} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{t.validate}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20
  },

  backText: {
    color: "#2e86de",
    marginLeft: 5,
    fontWeight: "bold"
  },

  progressBar: {
    flexDirection: "row",
    marginBottom: 20
  },

  progressStep: {
    flex: 1,
    height: 6,
    backgroundColor: "#ddd",
    marginHorizontal: 3,
    borderRadius: 3
  },

  activeStep: {
    backgroundColor: "#2e86de"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  label: {
    marginBottom: 5,
    fontWeight: "bold"
  },

  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15
  },

  codeInput: {
    flex: 1,
    paddingVertical: 12
  },

  focused: {
    borderColor: "#2e86de"
  },

  button: {
    backgroundColor: "#2e86de",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});