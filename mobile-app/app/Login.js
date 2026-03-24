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

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  const { language, setLanguage, translations } = useContext(LanguageContext);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ];

  // ✅ تنظيف الإيمايل فقط
  const cleanEmail = (value) => {
    return value.trim().replace(/\s+/g, '').toLowerCase();
  };

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    const emailCleaned = cleanEmail(email);

    try {
      const res = await fetch("http://192.168.1.3:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailCleaned,
          password: password
        })
      });

      const text = await res.text();
      console.log("📥 LOGIN RAW RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        Alert.alert("Error", "Server returned invalid data");
        return;
      }

      if (data.success) {
        navigation.replace("Welcome");
      } else {
        Alert.alert("Error", data.message || "Email or password invalid");
      }

    } catch (error) {
      console.log("❌ LOGIN ERROR:", error);
      Alert.alert("Error", "Server error");
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

        {/* TOP ICONS */}
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => setLangDropdown(!langDropdown)}>
            <Ionicons name="language" size={26} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Ionicons name="help-circle-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* LANG */}
        {langDropdown && (
          <View style={styles.dropdown}>
            {languages.map(l => (
              <TouchableOpacity
                key={l.code}
                style={styles.langBtn}
                onPress={() => { setLanguage(l.code); setLangDropdown(false); }}
              >
                <Text>{l.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* CENTER */}
        <View style={styles.center}>
          <MaterialCommunityIcons name="school" size={90} color="#2e86de" />

          <Text style={styles.title}>{translations[language].loginTitle}</Text>
          <Text style={styles.subtitle}>{translations[language].loginSubtitle}</Text>

          {/* EMAIL */}
          <TextInput
            placeholder={translations[language].gmailPlaceholder}
            style={[styles.input, { borderColor: focusEmail ? '#2e86de' : '#ddd' }]}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* PASSWORD */}
          <View style={[styles.passBox, { borderColor: focusPass ? '#2e86de' : '#ddd' }]}>
            <TextInput
              placeholder={translations[language].passwordPlaceholder}
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

          {/* LOGIN */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>
              {translations[language].connect}
            </Text>
          </TouchableOpacity>

          {/* FORGOT PASSWORD */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignItems: "center", marginTop: 15 }}
          >
            <Text style={{ color: '#2e86de', fontWeight: '500' }}>
              {translations[language]?.forgotPassword || "Mot de passe oublié ?"}
            </Text>
          </TouchableOpacity>

        </View>

        {/* CREATE ACCOUNT (لتحت) */}
        <View style={styles.footer}>
          <Text>{translations[language].noAccountText} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterStep1')}>
            <Text style={styles.create}>
              {translations[language].createAccount}
            </Text>
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
    borderWidth: 1 
  },

  langBtn: { padding: 10 },

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