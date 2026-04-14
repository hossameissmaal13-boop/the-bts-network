const BASE_URL = "https://the-bts-network-production-e3f6.up.railway.app/api";

const parseJsonSafely = async (res) => {
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      success: false,
      message: text?.startsWith("<")
        ? "Server returned HTML instead of JSON"
        : "Invalid JSON response"
    };
  }
};

const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await parseJsonSafely(res);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `HTTP ${res.status}`,
        status: res.status,
        ...data
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error"
    };
  }
};

export const verifyStudent = async (data) => {
  return await request(`${BASE_URL}/students/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const registerStudent = async (data) => {
  return await request(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const loginStudent = async (data) => {
  return await request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const forgotPassword = async (data) => {
  return await request(`${BASE_URL}/students/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const updateStudentAccount = async (id, data) => {
  return await request(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const changeStudentPassword = async (id, data) => {
  return await request(`${BASE_URL}/auth/change-password/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};

export const deleteStudentAccount = async (id) => {
  return await request(`${BASE_URL}/students/${id}`, {
    method: "DELETE"
  });
};