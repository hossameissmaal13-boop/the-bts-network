const BASE_URL = "http://localhost:5000/api/students";

// =====================================
// ✅ GET STUDENTS
// =====================================
export const getStudents = async () => {
  try {
    const res = await fetch(BASE_URL);
    const json = await res.json();
    console.log("📦 Students from backend:", json);
    return json;
  } catch (error) {
    console.error("❌ GET ERROR:", error);
    return { success: false, message: error.message };
  }
};

// =====================================
// ✅ ADD STUDENT
// =====================================
export const addStudent = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    console.log("💻 Backend response:", json);
    return json;
  } catch (error) {
    console.error("❌ ADD ERROR:", error);
    return { success: false, message: error.message };
  }
};

// =====================================
// ✅ DELETE STUDENT
// =====================================
export const deleteStudent = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    const json = await res.json();
    console.log("🗑️ Delete response:", json);
    return json;
  } catch (error) {
    console.error("❌ DELETE ERROR:", error);
    return { success: false, message: error.message };
  }
};
// =====================================
// ✅ UPDATE STUDENT
// =====================================
export const updateStudent = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    console.log("UPDATE RAW:", text); // 🔥 مهم

    const json = JSON.parse(text);
    return json;

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return { success: false };
  }
};