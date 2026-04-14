import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { getToken, removeToken } from '../src/utils/tokenManager';
import { Ionicons } from '@expo/vector-icons';

const BASE_URL = "https://the-bts-network-production-e3f6.up.railway.app/api";

export default function Account({ navigation }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = await getToken();

        if (!token) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
          });
          return;
        }

        const res = await fetch(`${BASE_URL}/students/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          setLoading(false);
          return;
        }

        if (data.success) {
          setStudent(data.student);
        }
      } catch (error) {
        console.log("GET ME ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [navigation]);

  const handleLogout = async () => {
    await removeToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color="#2563eb" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Account</Text>

      <View style={styles.card}>
        {student?.photo ? (
          <Image source={{ uri: student.photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {student?.prenom?.charAt(0)?.toUpperCase() || student?.nom?.charAt(0)?.toUpperCase() || "S"}
            </Text>
          </View>
        )}

        <Text style={styles.name}>
          {student?.prenom || ""} {student?.nom || ""}
        </Text>

        <Text style={styles.info}>ID: {student?.studentId || "—"}</Text>
        <Text style={styles.info}>Email: {student?.email || "—"}</Text>
        <Text style={styles.info}>Filière: {student?.filiere || "—"}</Text>
        <Text style={styles.info}>Année: {student?.anneeScolaire || "—"}</Text>
        <Text style={styles.info}>Type: {student?.typeBTS || "—"}</Text>
      </View>

      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={() => navigation.navigate("Settings", { student })}
      >
        <Text style={styles.settingsText}>Open Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6faff"
  },
  container: {
    flex: 1,
    backgroundColor: "#f6faff",
    padding: 20
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10
  },
  backText: {
    marginLeft: 6,
    color: "#2563eb",
    fontWeight: "700"
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 20
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 20
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  avatarText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800"
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 14
  },
  info: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 8
  },
  settingsBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12
  },
  settingsText: {
    color: "#fff",
    fontWeight: "800"
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 14,
    alignItems: "center"
  },
  logoutText: {
    color: "#fff",
    fontWeight: "800"
  }
});