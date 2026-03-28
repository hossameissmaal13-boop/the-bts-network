const BASE_URL = "https://the-bts-network-production.up.railway.app/api/lesson-contents";

export const addLessonContent = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getLessonContentsByLesson = async (lessonId) => {
  try {
    const res = await fetch(`${BASE_URL}/${lessonId}`);
    return await res.json();
  } catch (error) {
    return { success: false, items: [], message: error.message };
  }
};

export const updateLessonContent = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteLessonContent = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};