import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ServicesRow({ navigation, currentScreen, student }) {
  const getLessonsScreen = () => {
    const filiere = (student?.filiere || "").toUpperCase().trim();

    if (filiere === "EII") return "LessonsEii";
    if (filiere === "DAI") return "LessonsDai";
    if (filiere === "TC") return "LessonsTc";
    if (filiere === "CG") return "LessonsCg";

    return "Home";
  };

  const isLibre = student?.typeBTS === "Libre";

  const services = [
    {
      name: "Home",
      label: "Home",
      screen: "Home",
      icon: (color) => <Ionicons name="home-outline" size={22} color={color} />,
      disabled: false
    },
    {
      name: "Ai",
      label: "AI",
      screen: "Ai",
      icon: (color) => <MaterialCommunityIcons name="robot-outline" size={22} color={color} />,
      disabled: false
    },
    {
      name: "Lessons",
      label: "Lessons",
      screen: getLessonsScreen(),
      icon: (color) => <Ionicons name="book-outline" size={22} color={color} />,
      disabled: false
    },
    {
      name: "Messages",
      label: "Communication",
      screen: "Messages",
      icon: (color) => <Ionicons name="chatbubble-ellipses-outline" size={22} color={color} />,
      disabled: isLibre
    },
    {
      name: "Posts",
      label: "Posts",
      screen: "Posts",
      icon: (color) => <Ionicons name="newspaper-outline" size={22} color={color} />,
      disabled: false
    }
  ];

  return (
    <View style={styles.container}>
      {services.map((item) => {
        const isLessonsActive =
          item.name === "Lessons" &&
          ["LessonsEii", "LessonsDai", "LessonsTc", "LessonsCg", "SubjectLessons", "LessonDetails"].includes(currentScreen);

        const isActive = currentScreen === item.screen || isLessonsActive;

        const iconColor = item.disabled
          ? "#94a3b8"
          : isActive
          ? "#fff"
          : "#2563eb";

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.item}
            activeOpacity={0.85}
            onPress={() => {
              if (item.disabled) {
                Alert.alert(
                  "Accès limité",
                  "Le service Communication n'est pas disponible pour les comptes BTS Libre."
                );
                return;
              }

              navigation.navigate(item.screen, { student });
            }}
          >
            <View
              style={[
                styles.circle,
                isActive && !item.disabled && styles.activeCircle,
                item.disabled && styles.disabledCircle
              ]}
            >
              {item.icon(iconColor)}
            </View>

            <Text
              style={[
                styles.label,
                isActive && !item.disabled && styles.activeLabel,
                item.disabled && styles.disabledLabel
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  item: {
    width: "18%",
    alignItems: "center"
  },

  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
    marginBottom: 6
  },

  activeCircle: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb"
  },

  disabledCircle: {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1"
  },

  label: {
    fontSize: 11,
    color: "#0f172a",
    fontWeight: "600",
    textAlign: "center"
  },

  activeLabel: {
    color: "#2563eb"
  },

  disabledLabel: {
    color: "#94a3b8"
  }
});