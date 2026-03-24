import AsyncStorage from '@react-native-async-storage/async-storage';

// تحميل الطلاب
export const loadStudents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@students');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading students', e);
    return [];
  }
};

// حفظ الطلاب
export const saveStudents = async (students) => {
  try {
    const jsonValue = JSON.stringify(students);
    await AsyncStorage.setItem('@students', jsonValue);
  } catch (e) {
    console.error('Error saving students', e);
  }
};

// مسح جميع الطلاب
export const clearStudents = async () => {
  try {
    await AsyncStorage.removeItem('@students');
  } catch (e) {
    console.error('Error clearing students', e);
  }
};