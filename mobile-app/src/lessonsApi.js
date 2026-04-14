const BASE_URL = "https://the-bts-network-production-e3f6.up.railway.app/api/lessons";

export const getLessonsByFiliereAndAnnee = async (filiere, annee) => {
  try {
    const res = await fetch(`${BASE_URL}/${filiere}/${annee}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("❌ LESSONS API ERROR:", error);
    return { success: false };
  }
};