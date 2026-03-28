import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getStudents, deleteStudent, updateStudent } from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [showPasswordById, setShowPasswordById] = useState({});

  const fetchData = async () => {
    const res = await getStudents();
    if (res.success) {
      setStudents(res.students || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) =>
      `${s.nom || ""} ${s.prenom || ""}`.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [students, search]);

  const connectedStudents = filteredStudents.filter(
    (s) => s.typeBTS === "Connecter"
  );

  const libreStudents = filteredStudents.filter(
    (s) => s.typeBTS === "Libre"
  );

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer cet étudiant ?");
    if (!ok) return;

    const res = await deleteStudent(id);
    if (res.success) {
      fetchData();
    }
  };

  const handleEdit = (student) => {
    setEditId(student._id);
    setEmail(student.email || "");
    setPassword("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEmail("");
    setPassword("");
  };

  const handleUpdate = async (id) => {
    const payload = {
      email: email.trim(),
      password: password
    };

    const res = await updateStudent(id, payload);

    if (res.success) {
      setEditId(null);
      setEmail("");
      setPassword("");
      fetchData();
    } else {
      alert("Erreur lors de la mise à jour");
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswordById((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderTable = (title, subtitle, data) => (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
        border: "1px solid #e2e8f0",
        marginBottom: 24
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ margin: 0, color: "#0f172a" }}>{title}</h3>
        <p style={{ marginTop: 8, color: "#64748b" }}>{subtitle}</p>
      </div>

      <div
        style={{
          overflowX: "auto",
          borderRadius: 14,
          border: "1px solid #e2e8f0"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff"
          }}
        >
          <thead>
            <tr style={{ background: "#2e86de", color: "#fff" }}>
              <th style={thStyle}>Nom</th>
              <th style={thStyle}>Prénom</th>
              <th style={thStyle}>Filière</th>
              <th style={thStyle}>Année</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
                  Aucun étudiant trouvé
                </td>
              </tr>
            ) : (
              data.map((s, index) => (
                <tr
                  key={s._id}
                  style={{
                    background: index % 2 === 0 ? "#ffffff" : "#f8fafc"
                  }}
                >
                  <td style={tdStyle}>{s.nom}</td>
                  <td style={tdStyle}>{s.prenom}</td>
                  <td style={tdStyle}>{s.filiere}</td>
                  <td style={tdStyle}>{s.anneeScolaire}</td>

                  <td style={tdStyle}>
                    {editId === s._id ? (
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={inputStyle}
                      />
                    ) : (
                      s.email || "-"
                    )}
                  </td>

                  <td style={tdStyle}>
                    {editId === s._id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type={showPasswordById[s._id] ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Nouveau code"
                          style={{ ...inputStyle, marginBottom: 0 }}
                        />
                        <button
                          onClick={() => togglePasswordVisibility(s._id)}
                          style={eyeBtnStyle}
                          title="Afficher / masquer"
                        >
                          {showPasswordById[s._id] ? "🙈" : "👁️"}
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span>
                          {showPasswordById[s._id]
                            ? (s.plainPassword ? s.plainPassword : "Code non disponible")
                            : "••••"}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(s._id)}
                          style={eyeBtnStyle}
                          title="Afficher / masquer"
                        >
                          {showPasswordById[s._id] ? "🙈" : "👁️"}
                        </button>
                      </div>
                    )}
                  </td>

                  <td style={tdStyle}>
                    {editId === s._id ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={() => handleUpdate(s._id)} style={saveBtnStyle}>
                          Save
                        </button>
                        <button onClick={handleCancel} style={cancelBtnStyle}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={() => handleEdit(s)} style={editBtnStyle}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(s._id)} style={deleteBtnStyle}>
                          Supprimer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", background: "#f8fafc", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: 30, marginRight: 240 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
            border: "1px solid #e2e8f0",
            marginBottom: 24
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ margin: 0, color: "#0f172a" }}>👨‍🎓 Students</h2>
            <p style={{ marginTop: 8, color: "#64748b" }}>
              Gérez les emails et les codes des étudiants inscrits
            </p>
          </div>

          <div>
            <input
              type="text"
              placeholder="Chercher par nom ou prénom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid #cbd5e1",
                outline: "none",
                fontSize: 14,
                background: "#fff"
              }}
            />
          </div>
        </div>

        {renderTable(
          "🔵 BTS Connecter",
          "Étudiants officiels vérifiés par l’administration",
          connectedStudents
        )}

        {renderTable(
          "🟢 BTS Libre",
          "Étudiants inscrits librement sans vérification administrative",
          libreStudents
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px 12px",
  textAlign: "left",
  fontSize: 14,
  fontWeight: "700",
  borderBottom: "1px solid #dbeafe"
};

const tdStyle = {
  padding: "14px 12px",
  textAlign: "left",
  borderBottom: "1px solid #e2e8f0",
  color: "#0f172a",
  verticalAlign: "middle"
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: 14,
  background: "#fff"
};

const eyeBtnStyle = {
  border: "none",
  background: "#e2e8f0",
  borderRadius: 8,
  padding: "8px 10px",
  cursor: "pointer"
};

const editBtnStyle = {
  border: "none",
  background: "#2e86de",
  color: "#fff",
  borderRadius: 10,
  padding: "9px 12px",
  cursor: "pointer",
  fontWeight: "600"
};

const deleteBtnStyle = {
  border: "none",
  background: "#ef4444",
  color: "#fff",
  borderRadius: 10,
  padding: "9px 12px",
  cursor: "pointer",
  fontWeight: "600"
};

const saveBtnStyle = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 10,
  padding: "9px 12px",
  cursor: "pointer",
  fontWeight: "600"
};

const cancelBtnStyle = {
  border: "none",
  background: "#64748b",
  color: "#fff",
  borderRadius: 10,
  padding: "9px 12px",
  cursor: "pointer",
  fontWeight: "600"
};