import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studyImage from "../assets/study.jpg";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "hossameissmaal13@gmail.com";
    const adminPassword = "Hosred@20*15";

    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      setError("Adresse e-mail incorrecte");
    } else if (password !== adminPassword) {
      setError("Mot de passe incorrect");
    } else {
      setError("");
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "Tahoma"
    }}>
      {/* الصورة على الجانب الأيسر */}
      <div style={{
        flex: 1,
        backgroundImage: `url(${studyImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      </div>

      {/* نموذج تسجيل الدخول على الجانب الأيمن */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8"
      }}>
        <form onSubmit={handleLogin} style={{
          background: "#fff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: 360,
          display: "flex",
          flexDirection: "column",
          gap: 15
        }}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Connexion Administrateur</h2>

          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}
          />

          {error && <div style={{ color: "red", fontSize: 13 }}>{error}</div>}

          <button
            type="submit"
            style={{
              padding: "12px 0",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 15
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}