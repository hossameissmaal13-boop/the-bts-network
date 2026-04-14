import React, { useContext, useMemo, useState } from "react";
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
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LanguageContext } from "../src/utils/LanguageContext";
import { updateStudentAccount } from "../src/api";

export default function EditAccount({ navigation, route }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const student = route?.params?.student || null;

  const isLibre = useMemo(() => {
    return (
      student?.typeBTS === "Libre" ||
      student?.typeBTS === "BTS Libre" ||
      student?.typeBTS === "LIBRE"
    );
  }, [student]);

  const [focusField, setFocusField] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: student?.nom || "",
    prenom: student?.prenom || "",
    email: student?.email || "",
    photo: student?.photo || ""
  });

  const firstLetter = useMemo(() => {
    if (formData.prenom) return formData.prenom.charAt(0).toUpperCase();
    if (formData.nom) return formData.nom.charAt(0).toUpperCase();
    return "S";
  }, [formData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(t.error || "Error", t.photoPermissionDenied || "Permission denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8
      });

      if (!result.canceled && result.assets?.length > 0) {
        setFormData((prev) => ({
          ...prev,
          photo: result.assets[0].uri
        }));
      }
    } catch (error) {
      Alert.alert(t.error || "Error", "Image selection failed");
    }
  };

  const handleSave = async () => {
    if (!student?._id) {
      Alert.alert(t.error || "Error", "Student not found");
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert(t.error || "Error", "Email is required");
      return;
    }

    if (isLibre && (!formData.nom.trim() || !formData.prenom.trim())) {
      Alert.alert(t.error || "Error", t.fillAllFields || "Fill all fields");
      return;
    }

    const payload = isLibre
      ? {
          nom: formData.nom.trim(),
          prenom: formData.prenom.trim(),
          email: formData.email.trim().toLowerCase(),
          photo: formData.photo
        }
      : {
          email: formData.email.trim().toLowerCase(),
          photo: formData.photo
        };

    try {
      setLoading(true);

      const res = await updateStudentAccount(student._id, payload);

      if (res?.success) {
        const updatedStudent = res.student || { ...student, ...payload };

        Alert.alert(
          t.success || "Success",
          res.message || "Account updated successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.replace("Settings", { student: updatedStudent })
            }
          ]
        );
      } else {
        Alert.alert(t.error || "Error", res?.message || "Update failed");
      }
    } catch (error) {
      Alert.alert(t.error || "Error", "Server problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#2563eb" />
            <Text style={styles.backText}>{t.back || "Back"}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{t.edit || "Edit Account"}</Text>

          <View style={styles.avatarWrap}>
            {formData.photo ? (
              <Image source={{ uri: formData.photo }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{firstLetter}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.photoBtn} onPress={handlePickImage}>
            <Text style={styles.photoBtnText}>
              {t.changePhoto || "Modifier photo"}
            </Text>
          </TouchableOpacity>

          {isLibre && (
            <>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                value={formData.nom}
                onChangeText={(v) => handleChange("nom", v)}
                style={[styles.input, focusField === "nom" && styles.focused]}
                placeholder="Nom"
                onFocus={() => setFocusField("nom")}
                onBlur={() => setFocusField(null)}
              />

              <Text style={styles.label}>Prénom</Text>
              <TextInput
                value={formData.prenom}
                onChangeText={(v) => handleChange("prenom", v)}
                style={[styles.input, focusField === "prenom" && styles.focused]}
                placeholder="Prénom"
                onFocus={() => setFocusField("prenom")}
                onBlur={() => setFocusField(null)}
              />
            </>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={formData.email}
            onChangeText={(v) => handleChange("email", v)}
            style={[styles.input, focusField === "email" && styles.focused]}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField(null)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
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
  title: { fontSize: 24, fontWeight: "800", color: "#0f172a", marginBottom: 18 },
  avatarWrap: { alignItems: "center", marginBottom: 16 },
  avatarCircle: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: "#3b82f6",
    justifyContent: "center", alignItems: "center"
  },
  avatarImage: { width: 92, height: 92, borderRadius: 46 },
  avatarText: { color: "#fff", fontSize: 38, fontWeight: "800" },
  photoBtn: {
    backgroundColor: "#e0edff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18
  },
  photoBtnText: { color: "#2563eb", fontWeight: "700" },
  label: { marginBottom: 6, fontWeight: "700", color: "#111827" },
  input: {
    borderWidth: 2, borderColor: "#dbe2ea", borderRadius: 14,
    padding: 14, marginBottom: 16, backgroundColor: "#fff", color: "#111827"
  },
  focused: { borderColor: "#2563eb" },
  button: {
    backgroundColor: "#2563eb", paddingVertical: 15, borderRadius: 14,
    alignItems: "center", marginTop: 10
  },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 16 }
});