const BASE_URL = "https://the-bts-network-production.up.railway.app/api";

// VERIFY
export const verifyStudent = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/students/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// REGISTER
export const registerStudent = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// LOGIN
export const loginStudent = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/students/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
};