const BASE_URL = "https://the-bts-network-production.up.railway.app/api/lesson-contents";

export const getLessonContentsByLesson = async (lessonId) => {
  try {
    const res = await fetch(`${BASE_URL}/${lessonId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("❌ LESSON CONTENTS API ERROR:", error);
    return { success: false, items: [] };
  }
};