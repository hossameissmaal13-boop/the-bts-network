// studentsStorage.js
export const saveStudents = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

export const loadStudents = () => {
  const data = localStorage.getItem("students");
  return data ? JSON.parse(data) : [];
};

export const removeStudent = (id) => {
  const students = loadStudents().filter(s => s.id !== id);
  saveStudents(students);
};