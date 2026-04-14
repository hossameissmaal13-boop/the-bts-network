const BASE_URL = "http://localhost:5000/api/lesson-contents";

export const addLessonContent = async (data) => {
  try {
    const formData = new FormData();
    formData.append("lessonId", data.lessonId);
    formData.append("title", data.title);
    formData.append("type", data.type);

    if (data.file) {
      formData.append("file", data.file);
    }

    const res = await fetch(BASE_URL, {
      method: "POST",
      body: formData
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", data.type);

    if (data.file) {
      formData.append("file", data.file);
    }

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: formData
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