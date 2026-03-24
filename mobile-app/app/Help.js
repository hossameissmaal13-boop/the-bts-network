// app/Help.js
import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Linking,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LanguageContext } from '../src/utils/LanguageContext';

export default function Help({ navigation }) {
  const { language, translations } = useContext(LanguageContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* باش نبعدو من notch و الساعة */}
      <View style={{ height: StatusBar.currentHeight || 30 }} />

      {/* BACK */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.pageTitle}>{translations[language].helpTitle}</Text>

      {Object.values(translations[language].helpBlocks).map((block, i) => (
        <View key={i} style={styles.block}>
          <MaterialCommunityIcons name="school" size={30} color="#2e86de" />
          <Text style={styles.blockTitle}>{block.title}</Text>
          <Text style={styles.blockText}>{block.text}</Text>
        </View>
      ))}

      {/* SOCIALS */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => Linking.openURL('https://instagram.com')}
        >
          <Ionicons name="logo-instagram" size={22} color="#fff" />
          <Text style={styles.socialText}>Network BTS Fès</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => Linking.openURL('https://facebook.com')}
        >
          <Ionicons name="logo-facebook" size={22} color="#fff" />
          <Text style={styles.socialText}>Network BTS Fès</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    paddingBottom: 40   // ⭐ باش الأزرار مايخرجوش لتحت
  },

  backBtn: { 
    marginBottom: 20,
    marginTop: 5
  },

  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 25 
  },

  block: { 
    marginBottom: 20, 
    padding: 15, 
    borderRadius: 12, 
    backgroundColor: '#f2f2f2' 
  },

  blockTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },

  blockText: { 
    fontSize: 14, 
    color: '#333' 
  },

  socialContainer:{
    marginTop: 10
  },

  socialBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#2e86de', 
    padding: 14, 
    borderRadius: 10, 
    marginBottom: 12 
  },

  socialText: { 
    color: '#fff', 
    marginLeft: 8, 
    fontWeight: 'bold' 
  },
});