import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MainButton from "../components/MainButton";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../services/api";

export default function DashboardHome() {
  const navigate = useNavigate();

  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    fetchStudentsCount();
  }, []);

  const fetchStudentsCount = async () => {
    const res = await getStudents();

    if (res.success && res.students) {
      const completedStudents = res.students.filter((student) => {
        return (
          student.nom &&
          student.prenom &&
          student.filiere &&
          student.anneeScolaire &&
          student.email &&
          student.plainPassword
        );
      });

      setStudentsCount(completedStudents.length);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        background: "#f9fafb",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: 40,
          marginRight: 240
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: "700",
              color: "#111827"
            }}
          >
            👋 Bienvenue !
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: 8
            }}
          >
            Gérez facilement votre plateforme BTS
          </p>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 25,
            marginBottom: 40
          }}
        >
          <StatCard title="Étudiants" number={studentsCount} color="#3B82F6" />
          <StatCard title="Cours" number="35" color="#10B981" />
          <StatCard title="Publications" number="58" color="#F59E0B" />
        </div>

        {/* ACTIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 25
          }}
        >
          <MainButton
            title="Étudiants"
            onClick={() => navigate("/students")}
          />
          <MainButton
            title="Cours"
            onClick={() => navigate("/lessons")}
          />
          <MainButton
            title="Publications"
            onClick={() => navigate("/post")}
          />
        </div>
      </div>
    </div>
  );
}