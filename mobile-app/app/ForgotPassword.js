import React, { useState, useContext } from "react";
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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { LanguageContext } from "../src/utils/LanguageContext";

export default function ForgotPassword({ navigation }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const [focusField, setFocusField] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    codeMassar: "",
    filiere: "DAI",
    dateNaissance: "",
    anneeScolaire: "Première année",
    email: ""
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { nom, prenom, codeMassar, filiere, dateNaissance, anneeScolaire, email } = formData;

    if (!nom || !prenom || !codeMassar || !filiere || !dateNaissance || !anneeScolaire || !email) {
      Alert.alert(t.error, t.fillAllFields || "Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nom,
        prenom,
        codeMassar,
        filiere,
        dateNaissance,
        anneeScolaire,
        email
      };

      const res = await fetch("http://192.168.1.3:5000/api/students/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      console.log("📥 FORGOT PASSWORD RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        Alert.alert(t.error, t.serverProblem);
        return;
      }

      if (data.success) {
        Alert.alert(
          t.success,
          t.forgotPasswordSent || "Your account information has been sent.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert(t.error, data.message || t.incorrectInfo);
      }
    } catch (error) {
      console.log("❌ FORGOT PASSWORD ERROR:", error);
      Alert.alert(t.error, t.serverProblem);
    } finally {
      setLoading(false);
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

        <Text style={styles.title}>{t.forgotPasswordTitle || t.forgotPassword}</Text>
        <Text style={styles.subtitle}>
          {t.forgotPasswordSubtitle || "Verify your information to receive your account details."}
        </Text>

        {/* NOM */}
        <Text style={styles.label}>{t.lastName}</Text>
        <TextInput
          placeholder={t.lastNamePlaceholder}
          style={[styles.input, focusField === "nom" && styles.focused]}
          value={formData.nom}
          onChangeText={(v) => handleChange("nom", v)}
          onFocus={() => setFocusField("nom")}
          onBlur={() => setFocusField(null)}
        />

        {/* PRENOM */}
        <Text style={styles.label}>{t.firstName}</Text>
        <TextInput
          placeholder={t.firstNamePlaceholder}
          style={[styles.input, focusField === "prenom" && styles.focused]}
          value={formData.prenom}
          onChangeText={(v) => handleChange("prenom", v)}
          onFocus={() => setFocusField("prenom")}
          onBlur={() => setFocusField(null)}
        />

        {/* MASSAR */}
        <Text style={styles.label}>{t.massar}</Text>
        <TextInput
          placeholder={t.massarPlaceholder}
          style={[styles.input, focusField === "massar" && styles.focused]}
          value={formData.codeMassar}
          onChangeText={(v) => handleChange("codeMassar", v)}
          onFocus={() => setFocusField("massar")}
          onBlur={() => setFocusField(null)}
        />

        {/* FILIERE */}
        <Text style={styles.label}>{t.filiere}</Text>
        <View style={[styles.pickerWrapper, focusField === "filiere" && styles.focused]}>
          <Picker
            selectedValue={formData.filiere}
            onValueChange={(v) => handleChange("filiere", v)}
            onFocus={() => setFocusField("filiere")}
            onBlur={() => setFocusField(null)}
          >
            <Picker.Item label="DAI" value="DAI" />
            <Picker.Item label="EII" value="EII" />
            <Picker.Item label="TC" value="TC" />
            <Picker.Item label="CG" value="CG" />
          </Picker>
        </View>

        {/* DATE */}
        <Text style={styles.label}>{t.birthDate}</Text>
        <TouchableOpacity
          style={[styles.input, focusField === "date" && styles.focused]}
          onPress={() => {
            setShowDatePicker(true);
            setFocusField("date");
          }}
        >
          <Text style={{ color: formData.dateNaissance ? "#000" : "#999" }}>
            {formData.dateNaissance || t.birthDatePlaceholder}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={(e, d) => {
              setShowDatePicker(false);
              setFocusField(null);
              if (d) {
                const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                handleChange("dateNaissance", formatted);
              }
            }}
          />
        )}

        {/* YEAR */}
        <Text style={styles.label}>{t.schoolYear}</Text>
        <View style={[styles.pickerWrapper, focusField === "year" && styles.focused]}>
          <Picker
            selectedValue={formData.anneeScolaire}
            onValueChange={(v) => handleChange("anneeScolaire", v)}
            onFocus={() => setFocusField("year")}
            onBlur={() => setFocusField(null)}
          >
            <Picker.Item label={t.firstYear} value="Première année" />
            <Picker.Item label={t.secondYear} value="Deuxième année" />
          </Picker>
        </View>

        {/* EMAIL DESTINATION */}
        <Text style={styles.label}>{t.email}</Text>
        <TextInput
          placeholder={t.gmailPlaceholder}
          style={[styles.input, focusField === "email" && styles.focused]}
          value={formData.email}
          onChangeText={(v) => handleChange("email", v)}
          onFocus={() => setFocusField("email")}
          onBlur={() => setFocusField(null)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? (t.sending || "Sending...") : (t.send || "Send")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 40
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15
  },
  backText: {
    color: "#2e86de",
    marginLeft: 5,
    fontWeight: "bold"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111"
  },
  subtitle: {
    color: "#666",
    marginBottom: 25
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    color: "#222"
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff"
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    backgroundColor: "#fff"
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
    fontWeight: "bold",
    fontSize: 16
  }
});