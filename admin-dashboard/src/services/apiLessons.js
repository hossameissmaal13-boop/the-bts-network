const BASE_URL = "https://the-bts-network-production.up.railway.app/api";

// GET ALL
export const getLessons = async () => {
  try {
    const res = await fetch(`${BASE_URL}/lessons`);
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

// ADD
export const addLesson = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/lessons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

// UPDATE
export const updateLesson = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/lessons/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

// DELETE
export const deleteLesson = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/lessons/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};