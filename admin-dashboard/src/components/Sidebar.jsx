import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const buttons = [
  { title: "🏠 Page-principal", path: "/dashboard" },
  { title: "👨‍🎓 Ajouter Étudiant", path: "/ajouter-etudiant" },
  { title: "📚 Partager Cours", path: "/ajouter-lessons" },
  { title: "📝 Poster une Publication", path: "/ajouter-post" },
  { title: "💬 Envoyer un Message", path: "/poster-message" }
];


  return (
    <div style={{
      width: 240,
      height: "100vh", // ✅ طول كامل الشاشة
      position: "fixed", // ✅ ثابت
      right: 0, // ✅ في اليمين
      top: 0,
      background: "#020617",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px 15px",
      borderLeft: "1px solid #1e293b"
    }}>

      {/* TOP */}
      <div>
        <h2 style={{
          color: "#f1f5f9",
          fontSize: 18,
          marginBottom: 30,
          textAlign: "center"
        }}>
         🚀 BTS Admin
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
          {buttons.map((btn, i) => (
            <div
              key={i}
              onClick={() => navigate(btn.path)}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                color: "#94a3b8",
                cursor: "pointer",
                transition: "0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#1e293b";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              {btn.title}
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{
        color: "#64748b",
        fontSize: 12,
        textAlign: "center"
      }}>
        © BTS Platform
      </div>

    </div>
  );
}