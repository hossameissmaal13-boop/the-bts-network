import React, { useState, useEffect } from "react";
import { getStudents, addStudent, deleteStudent } from "../services/api.js";
import Sidebar from "../components/Sidebar";

export default function AjouterEtudiant() {

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    codeMassar: "",
    filiere: "DAI",
    dateNaissance: "",
    anneeScolaire: "Première année",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents();
    if (res.success) setStudents(res.students);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async () => {
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.codeMassar ||
      !formData.filiere ||
      !formData.dateNaissance ||
      !formData.anneeScolaire
    ) {
      setMessage("❌ Tous les champs sont obligatoires !");
      return;
    }

    const res = await addStudent(formData);
    if (res.success) {
      setMessage("✅ Étudiant ajouté avec succès !");
      setStudents([...students, res.student]);
      setFormData({
        nom: "",
        prenom: "",
        codeMassar: "",
        filiere: "DAI",
        dateNaissance: "",
        anneeScolaire: "Première année",
      });
    } else {
      setMessage(`❌ ${res.message}`);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteStudent(id);
    if (res.success) {
      setStudents(students.filter((s) => s._id !== id));
      setMessage("🗑️ Étudiant supprimé");
    }
  };

  const filteredStudents = students.filter((s) =>
    s.nom.toLowerCase().includes(search.toLowerCase())
  );

  const renderTable = (title, filiereCode) => {
    const data = filteredStudents.filter((s) => s.filiere === filiereCode);

    return (
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ color: "#0f172a", marginBottom: 10 }}>{title}</h3>

        <table style={tableStyle}>
          <thead style={{ background: "#2563eb", color: "#fff" }}>
            <tr>
              <th style={th}>Nom</th>
              <th style={th}>Prénom</th>
              <th style={th}>Massar</th>
              <th style={th}>Date</th>
              <th style={th}>Année</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr key={s._id} style={{ transition: "0.2s" }}>
                <td style={td}>{s.nom}</td>
                <td style={td}>{s.prenom}</td>
                <td style={td}>{s.codeMassar}</td>
                <td style={td}>{s.dateNaissance}</td>
                <td style={td}>{s.anneeScolaire}</td>
                <td style={td}>
                  <button
                    onClick={() => handleDelete(s._id)}
                    style={deleteBtn}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR FIXED */}
      <div style={sidebarWrapper}>
        <Sidebar />
      </div>

      {/* MAIN */}
      <div style={mainStyle}>
        <h2 style={{ marginBottom: 20 }}>Ajouter un étudiant</h2>

        {/* FORM */}
        <div style={formContainer}>
          {["nom", "prenom", "codeMassar"].map((field) => (
            <input
              key={field}
              placeholder={
                field === "nom"
                  ? "Nom de famille"
                  : field === "prenom"
                  ? "Prénom"
                  : "Code Massar"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onFocus={() => setFocus(field)}
              onBlur={() => setFocus(null)}
              style={{
                ...inputStyle,
                borderColor: focus === field ? "#2563eb" : "#ccc"
              }}
            />
          ))}

          <select
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="EII">Electronique et Informatique Industrielle</option>
            <option value="DAI">Développement des Applications Informatiques</option>
            <option value="TC">Technico-Commercial</option>
            <option value="CG">Comptabilité et Gestion</option>
          </select>

          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="anneeScolaire"
            value={formData.anneeScolaire}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Première année">Première année</option>
            <option value="Deuxième année">Deuxième année</option>
          </select>

          <button style={btnStyle} onClick={handleAddStudent}>
            Ajouter
          </button>
        </div>

        {message && <p style={{ marginBottom: 20 }}>{message}</p>}

        {/* SEARCH */}
        <input
          placeholder="Entrer nom de famille pour chercher étudiant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, marginBottom: 20, width: "100%" }}
        />

        {/* TABLES */}
        {renderTable("Electronique et Informatique Industrielle", "EII")}
        {renderTable("Développement des Applications Informatiques", "DAI")}
        {renderTable("Technico-Commercial", "TC")}
        {renderTable("Comptabilité et Gestion", "CG")}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const sidebarWrapper = {
  position: "fixed",
  right: 0,
  top: 0,
  height: "100vh",
  zIndex: 1000
};

const mainStyle = {
  flex: 1,
  padding: 30,
  marginRight: 240,
  background: "#f8fafc",
  minHeight: "100vh"
};

const formContainer = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  marginBottom: 20,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 15,
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  transition: "0.2s"
};

const btnStyle = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: 12,
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s"
};

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  borderRadius: 10,
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const th = { padding: 10, textAlign: "left" };
const td = { padding: 10, borderBottom: "1px solid #eee" };