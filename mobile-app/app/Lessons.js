import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getToken } from '../src/utils/tokenManager';
import { BASE_URL } from '../src/api';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/lessons`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setLessons(data || []);
    };
    fetchLessons();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lessons</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:24, marginBottom:20, textAlign:'center' },
  item:{ padding:10, borderBottomWidth:1, borderColor:'#ccc' }
});