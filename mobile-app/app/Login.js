import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LanguageContext } from '../src/utils/LanguageContext';
import { saveToken } from "../src/utils/tokenManager";

const BASE_URL = "https://the-bts-network-production-e3f6.up.railway.app/api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const { language, setLanguage, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.fr;

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  const cleanEmail = (value) => {
    return value.trim().replace(/\s+/g, '').toLowerCase();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t.error || "Error", t.fillAllFields || "Fill all fields");
      return;
    }

    const emailCleaned = cleanEmail(email);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailCleaned,
          password
        })
      });

      const text = await res.text();
      console.log("📥 LOGIN STATUS:", res.status);
      console.log("📥 LOGIN RAW RESPONSE:", text);

      if (!text) {
        Alert.alert(t.error || "Error", "Empty server response");
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        Alert.alert(t.error || "Error", text.slice(0, 120));
        return;
      }

      if (data.success) {
        if (data.token) {
          await saveToken(data.token);
        }

        navigation.replace("Welcome", { student: data.student });
      } else {
        Alert.alert(t.error || "Error", data.message || "Email or password invalid");
      }
    } catch (error) {
      console.log("❌ LOGIN ERROR:", error);
      Alert.alert(t.error || "Error", "Network or server error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => setLangDropdown(!langDropdown)}>
            <Ionicons name="language" size={26} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Ionicons name="help-circle-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {langDropdown && (
          <View style={styles.dropdown}>
            {languages.map(l => (
              <TouchableOpacity
                key={l.code}
                style={styles.langBtn}
                onPress={() => {
                  setLanguage(l.code);
                  setLangDropdown(false);
                }}
              >
                <Text>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.center}>
          <MaterialCommunityIcons name="school" size={90} color="#2e86de" />

          <Text style={styles.title}>{t.loginTitle}</Text>
          <Text style={styles.subtitle}>{t.loginSubtitle}</Text>

          <TextInput
            placeholder={t.gmailPlaceholder}
            style={[styles.input, { borderColor: focusEmail ? '#2e86de' : '#ddd' }]}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View style={[styles.passBox, { borderColor: focusPass ? '#2e86de' : '#ddd' }]}>
            <TextInput
              placeholder={t.passwordPlaceholder}
              secureTextEntry={!showPass}
              style={{ flex: 1 }}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusPass(true)}
              onBlur={() => setFocusPass(false)}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons name={showPass ? "eye" : "eye-off"} size={22} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>{t.connect}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignItems: "center", marginTop: 15 }}
          >
            <Text style={{ color: '#2e86de', fontWeight: '500' }}>
              {t.forgotPassword || "Mot de passe oublié ?"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>{t.noAccountText} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterStep1')}>
            <Text style={styles.create}>{t.createAccount}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 25,
    justifyContent: "space-between"
  },
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    left: 25,
    width: 140,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    zIndex: 10
  },
  langBtn: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  center: {
    alignItems: 'center',
    marginTop: -30
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10
  },
  subtitle: {
    color: 'gray',
    marginBottom: 25
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    padding: 14,
    marginBottom: 15
  },
  passBox: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center'
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40
  },
  create: {
    color: '#2e86de',
    fontWeight: 'bold'
  }
});