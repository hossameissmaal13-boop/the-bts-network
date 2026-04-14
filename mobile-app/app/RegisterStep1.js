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
  Platform,
  Keyboard
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { verifyStudent } from "../src/api";
import { LanguageContext } from "../src/utils/LanguageContext";

export default function RegisterStep1({ navigation }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const [typeBTS, setTypeBTS] = useState("Libre");
  const [focusField, setFocusField] = useState(null);
  const [errors, setErrors] = useState({});
  const [showReport, setShowReport] = useState(false);

  const [formData, setFormData] = useState({
    nomFr: "",
    prenomFr: "",
    codeMassar: "",
    filiere: "DAI",
    dateNaissance: "",
    anneeScolaire: "Première année"
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleVerify = async () => {
    let newErrors = {};

    if (!formData.nomFr) newErrors.nomFr = true;
    if (!formData.prenomFr) newErrors.prenomFr = true;
    if (typeBTS === "Connecter" && !formData.codeMassar) newErrors.codeMassar = true;
    if (!formData.dateNaissance) newErrors.dateNaissance = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (typeBTS === "Libre") {
      Alert.alert(t.success, t.noVerification || "No verification needed");
      navigation.navigate("RegisterStep2", { formData, typeBTS });
      return;
    }

    try {
      const clean = (s) => s?.toString().trim().replace(/\s+/g, "").toUpperCase();

      const res = await verifyStudent({
        nomFr: clean(formData.nomFr),
        prenomFr: clean(formData.prenomFr),
        codeMassar: clean(formData.codeMassar),
        filiere: clean(formData.filiere),
        anneeScolaire: clean(formData.anneeScolaire),
        dateNaissance: formData.dateNaissance
      });

      console.log("Response from verifyStudent:", res);

      if (res && res.success) {
        Alert.alert(t.success, t.verificationSuccess || "Verification success");
        navigation.navigate("RegisterStep2", { formData, typeBTS });
      } else {
        Keyboard.dismiss();
        Alert.alert(t.error, t.incorrectInfo || "Incorrect information");
        setShowReport(true);
      }
    } catch (error) {
      console.log("Error verifying student:", error);
      Keyboard.dismiss();
      Alert.alert(t.error, t.serverProblem || "Server problem");
      setShowReport(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#2e86de" />
            <Text style={styles.backText}>{t.back}</Text>
          </TouchableOpacity>

          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.activeStep]} />
            <View style={styles.progressStep} />
          </View>
        </View>

        <Text style={styles.label}>{t.chooseBts}</Text>
        <View style={[styles.pickerWrapper, focusField === "type" && styles.focused]}>
          <Picker
            selectedValue={typeBTS}
            onValueChange={(value) => setTypeBTS(value)}
            onFocus={() => setFocusField("type")}
            onBlur={() => setFocusField(null)}
          >
            <Picker.Item label={t.btsLibre} value="Libre" />
            <Picker.Item label={t.btsConnected} value="Connecter" />
          </Picker>
        </View>

        <Text style={styles.label}>{t.lastName}</Text>
        <TextInput
          value={formData.nomFr}
          onChangeText={(v) => handleChange("nomFr", v)}
          style={[styles.input, focusField === "nom" && styles.focused, errors.nomFr && styles.error]}
          placeholder={t.lastNamePlaceholder}
          onFocus={() => setFocusField("nom")}
          onBlur={() => setFocusField(null)}
        />

        <Text style={styles.label}>{t.firstName}</Text>
        <TextInput
          value={formData.prenomFr}
          onChangeText={(v) => handleChange("prenomFr", v)}
          style={[styles.input, focusField === "prenom" && styles.focused, errors.prenomFr && styles.error]}
          placeholder={t.firstNamePlaceholder}
          onFocus={() => setFocusField("prenom")}
          onBlur={() => setFocusField(null)}
        />

        {typeBTS === "Connecter" && (
          <>
            <Text style={styles.label}>{t.massar}</Text>
            <TextInput
              value={formData.codeMassar}
              onChangeText={(v) => handleChange("codeMassar", v)}
              style={[styles.input, focusField === "massar" && styles.focused, errors.codeMassar && styles.error]}
              placeholder={t.massarPlaceholder}
              onFocus={() => setFocusField("massar")}
              onBlur={() => setFocusField(null)}
              autoCapitalize="characters"
            />
          </>
        )}

        <Text style={styles.label}>{t.filiere}</Text>
        <View style={[styles.pickerWrapper, focusField === "filiere" && styles.focused]}>
          <Picker
            selectedValue={formData.filiere}
            onValueChange={(v) => handleChange("filiere", v)}
          >
            <Picker.Item label="DAI" value="DAI" />
            <Picker.Item label="EII" value="EII" />
            <Picker.Item label="TC" value="TC" />
            <Picker.Item label="CG" value="CG" />
          </Picker>
        </View>

        <Text style={styles.label}>{t.birthDate}</Text>
        <TouchableOpacity
          style={[styles.input, focusField === "date" && styles.focused, errors.dateNaissance && styles.error]}
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
            value={formData.dateNaissance ? new Date(formData.dateNaissance) : new Date()}
            mode="date"
            onChange={(e, d) => {
              setShowDatePicker(false);
              setFocusField(null);
              if (d) {
                const f = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                handleChange("dateNaissance", f);
              }
            }}
          />
        )}

        <Text style={styles.label}>{t.schoolYear}</Text>
        <View style={[styles.pickerWrapper, focusField === "year" && styles.focused]}>
          <Picker
            selectedValue={formData.anneeScolaire}
            onValueChange={(v) => handleChange("anneeScolaire", v)}
          >
            <Picker.Item label={t.firstYear} value="Première année" />
            <Picker.Item label={t.secondYear} value="Deuxième année" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>{t.verifyContinue}</Text>
        </TouchableOpacity>

        {showReport && (
          <TouchableOpacity onPress={() => navigation.navigate("Report")}>
            <Text style={styles.reportText}>{t.reportProblem}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  topBar: { marginTop: 30, marginBottom: 20 },
  backBtn: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backText: { color: "#2e86de", marginLeft: 5, fontWeight: "bold" },
  progressBar: { flexDirection: "row" },
  progressStep: { flex: 1, height: 6, backgroundColor: "#ddd", margin: 3, borderRadius: 3 },
  activeStep: { backgroundColor: "#2e86de" },
  label: { marginBottom: 5, fontWeight: "bold" },
  input: { borderWidth: 2, borderColor: "#ddd", borderRadius: 12, padding: 12, marginBottom: 15 },
  pickerWrapper: { borderWidth: 2, borderColor: "#ddd", borderRadius: 12, marginBottom: 15 },
  focused: { borderColor: "#2e86de" },
  error: { borderColor: "red" },
  button: { backgroundColor: "#2e86de", padding: 14, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  reportText: { color: "red", textAlign: "center", marginTop: 15, fontWeight: "bold" }
});