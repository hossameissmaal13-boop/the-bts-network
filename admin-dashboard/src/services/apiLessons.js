const BASE_URL = "https://the-bts-network-production.up.railway.app/api/lessons";

// ✅ GET ALL LESSONS
export const getLessons = async () => {
  try {
    const res = await fetch(BASE_URL);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ GET LESSONS ERROR:", error);
    return { success: false, message: error.message };
  }
};

// ✅ ADD LESSON
export const addLesson = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ ADD LESSON ERROR:", error);
    return { success: false, message: error.message };
  }
};

// ✅ UPDATE LESSON
export const updateLesson = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ UPDATE LESSON ERROR:", error);
    return { success: false, message: error.message };
  }
};

// ✅ DELETE LESSON
export const deleteLesson = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ DELETE LESSON ERROR:", error);
    return { success: false, message: error.message };
  }
};