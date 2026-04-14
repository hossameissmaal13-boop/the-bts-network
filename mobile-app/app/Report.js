// app/Report.js
import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LanguageContext } from '../src/utils/LanguageContext';
import * as MailComposer from 'expo-mail-composer';

export default function Report({ navigation }) {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    typeBTS: 'Libre',
    filiere: 'DAI',
    schoolYear: 'Première année',
    description: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = async () => {
    // Validate
    if (!formData.firstName || !formData.lastName || !formData.description) {
      Alert.alert(t.error, 'Please fill all required fields');
      return;
    }

    // Compose email body
    const body = `
      Name: ${formData.firstName} ${formData.lastName}
      BTS type: ${formData.typeBTS}
      Filière: ${formData.filiere}
      School Year: ${formData.schoolYear}

      Problem description:
      ${formData.description}
    `;

    try {
      const result = await MailComposer.composeAsync({
        recipients: ['hossameissmaal13@gmail.com'],
        subject: 'BTS Network - Problem Report',
        body: body
      });

      if (result.status === 'sent' || result.status === 'saved') {
        Alert.alert(t.success, t.reportSentMessage || "سيتم التواصل معكم في أقرب وقت");
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          typeBTS: 'Libre',
          filiere: 'DAI',
          schoolYear: 'Première année',
          description: ''
        });
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(t.error, t.serverProblem);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* BACK */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{t.back}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t.reportTitle}</Text>

        {/* FIRST NAME */}
        <Text style={styles.label}>{t.firstName}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.firstNamePlaceholder}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />

        {/* LAST NAME */}
        <Text style={styles.label}>{t.lastName}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.lastNamePlaceholder}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />

        {/* BTS TYPE */}
        <Text style={styles.label}>{t.chooseBts}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.typeBTS}
            onValueChange={(val) => handleChange('typeBTS', val)}
          >
            <Picker.Item label={t.btsLibre} value="Libre" />
            <Picker.Item label={t.btsConnected} value="BTS Connecter" />
          </Picker>
        </View>

        {/* FILIERE */}
        <Text style={styles.label}>{t.filiere}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.filiere}
            onValueChange={(val) => handleChange('filiere', val)}
          >
            <Picker.Item label="DAI" value="DAI" />
            <Picker.Item label="EII" value="EII" />
            <Picker.Item label="TC" value="TC" />
            <Picker.Item label="CG" value="CG" />
          </Picker>
        </View>

        {/* SCHOOL YEAR */}
        <Text style={styles.label}>{t.schoolYear}</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.schoolYear}
            onValueChange={(val) => handleChange('schoolYear', val)}
          >
            <Picker.Item label={t.firstYear} value="Première année" />
            <Picker.Item label={t.secondYear} value="Deuxième année" />
          </Picker>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.label}>{t.reportPlaceholder}</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder={t.reportPlaceholder}
          value={formData.description}
          multiline
          onChangeText={(text) => handleChange('description', text)}
        />

        {/* SEND BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>{t.sendReport}</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 60 },
  backBtn: { marginTop: 25, marginBottom: 20 },
  backText: { color: '#2e86de', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { 
    borderWidth: 2, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 15 
  },
  pickerWrapper: { borderWidth: 2, borderColor: '#ddd', borderRadius: 12, marginBottom: 15 },
  button: { backgroundColor: '#2e86de', padding: 14, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});