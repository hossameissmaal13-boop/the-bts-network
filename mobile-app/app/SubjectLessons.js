import { View, Text, StyleSheet } from "react-native";

export default function SubjectLessons({ route }) {
  const subject = route.params?.subject;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject?.title}</Text>
      <Text>📚 دروس المادة غادي يجيو هنا</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" }
});