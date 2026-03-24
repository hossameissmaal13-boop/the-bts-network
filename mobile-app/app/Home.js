import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const studentName = "Houssam";
  const firstLetter = studentName.charAt(0).toUpperCase();

  const actions = [
    {
      title: "Lessons",
      icon: <Ionicons name="book-outline" size={30} color="#2e86de" />,
      onPress: () => navigation.navigate("Lessons")
    },
    {
      title: "Messages",
      icon: <Ionicons name="chatbubble-ellipses-outline" size={30} color="#2e86de" />,
      onPress: () => navigation.navigate("Messages")
    },
    {
      title: "Posts",
      icon: <Ionicons name="newspaper-outline" size={30} color="#2e86de" />,
      onPress: () => navigation.navigate("Posts")
    },
    {
      title: "Ai",
      icon: <MaterialCommunityIcons name="robot-outline" size={30} color="#2e86de" />,
      onPress: () => Alert.alert("AI", "Page AI coming soon")
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileLetter}>{firstLetter}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Feather name="more-vertical" size={24} color="#1b2a3a" />
          </TouchableOpacity>
        </View>

        {/* CASTLE / HERO */}
        <View style={styles.heroSection}>
          <View style={styles.castleWrapper}>
            <MaterialCommunityIcons name="castle" size={100} color="#2e86de" />
          </View>

          <Text style={styles.heroTitle}>Bienvenue dans BTS Network</Text>
          <Text style={styles.heroSubtitle}>
            Votre espace intelligent pour apprendre, discuter et évoluer avec confiance.
          </Text>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.actionsContainer}>
          {actions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              activeOpacity={0.85}
              onPress={item.onPress}
            >
              <View style={styles.iconCircle}>{item.icon}</View>
              <Text style={styles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXTRA CARD */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your academic space</Text>
          <Text style={styles.infoText}>
            Access your lessons, follow posts, read messages and discover smart tools in one elegant place.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f8fc"
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25
  },

  profileCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#2e86de",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },

  profileLetter: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },

  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 30
  },

  castleWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#eaf4ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1b2a3a",
    textAlign: "center",
    marginBottom: 10
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#6c7a89",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 30
  },

  actionItem: {
    width: "47%",
    alignItems: "center",
    marginBottom: 24
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eef3f8"
  },

  actionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1b2a3a"
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b2a3a",
    marginBottom: 8
  },

  infoText: {
    color: "#6c7a89",
    lineHeight: 21,
    fontSize: 14
  }
});