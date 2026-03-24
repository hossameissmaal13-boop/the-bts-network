import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const StudentsContext = createContext();
export const useStudents = () => useContext(StudentsContext);

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    const newStudent = { ...student, id: uuidv4() };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedData) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  return (
    <StudentsContext.Provider value={{ students, addStudent, updateStudent }}>
      {children}
    </StudentsContext.Provider>
  );
}