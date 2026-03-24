import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getToken, removeToken } from '../src/utils/tokenManager';
import { BASE_URL } from '../src/api';

export default function Account({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const res = await fetch(`${BASE_URL}/students/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUser(data || {});
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:24, marginBottom:20, textAlign:'center' }
});