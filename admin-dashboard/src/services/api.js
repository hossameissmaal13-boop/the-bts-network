const API_BASE_URL = "http://localhost:3000/api";
const STUDENTS_URL = `${API_BASE_URL}/students`;

const parseJsonSafely = async (res) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Invalid JSON response:", text);
    return {
      success: false,
      message: "Réponse invalide du serveur",
      raw: text
    };
  }
};

const handleRequest = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await parseJsonSafely(res);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Erreur HTTP ${res.status}`,
        status: res.status,
        ...data
      };
    }

    return data;
  } catch (error) {
    console.error("❌ Network error:", error);
    return {
      success: false,
      message: error.message || "Erreur réseau"
    };
  }
};

export const getStudents = async () => {
  return await handleRequest(STUDENTS_URL);
};

export const addStudent = async (studentData) => {
  return await handleRequest(STUDENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });
};

export const updateStudent = async (id, studentData) => {
  return await handleRequest(`${STUDENTS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
  });
};

export const deleteStudent = async (id) => {
  return await handleRequest(`${STUDENTS_URL}/${id}`, {
    method: "DELETE"
  });
};