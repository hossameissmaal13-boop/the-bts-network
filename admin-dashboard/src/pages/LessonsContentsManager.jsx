import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  addLessonContent,
  getLessonContentsByLesson,
  updateLessonContent,
  deleteLessonContent
} from "../services/apiLessonContents";

export default function LessonContentsManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const lesson = location.state?.lesson;

  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "cours",
    file: null
  });

  useEffect(() => {
    if (!lesson?._id) return;
    fetchItems();
  }, [lesson]);

  const fetchItems = async () => {
    const res = await getLessonContentsByLesson(lesson._id);
    if (res.success) {
      setItems(res.items || []);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "cours",
      file: null
    });
    setEditId(null);

    const fileInput = document.getElementById("lesson-file-input");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Le nom est obligatoire");
      return;
    }

    if (!editId && !formData.file) {
      alert("Choisissez un fichier");
      return;
    }

    let res;

    if (editId) {
      res = await updateLessonContent(editId, {
        title: formData.title,
        type: formData.type,
        file: formData.file
      });
    } else {
      res = await addLessonContent({
        lessonId: lesson._id,
        title: formData.title,
        type: formData.type,
        file: formData.file
      });
    }

    if (res.success) {
      resetForm();
      fetchItems();
    } else {
      alert(res.message || "Erreur");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      title: item.title || "",
      type: item.type || "cours",
      file: null
    });

    const fileInput = document.getElementById("lesson-file-input");
    if (fileInput) fileInput.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
    if (!ok) return;

    const res = await deleteLessonContent(id);
    if (res.success) {
      fetchItems();
    } else {
      alert(res.message || "Erreur");
    }
  };

  const grouped = {
    cours: items.filter((i) => i.type === "cours"),
    exercice: items.filter((i) => i.type === "exercice"),
    examen: items.filter((i) => i.type === "examen"),
    tp: items.filter((i) => i.type === "tp")
  };

  const renderTable = (title, data) => (
    <div style={tableCardStyle}>
      <h3 style={tableTitleStyle}>{title}</h3>

      {data.length === 0 ? (
        <p style={{ color: "#64748b" }}>Aucun élément</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#2e86de", color: "#fff" }}>
                <th style={thStyle}>Nom</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Fichier</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  style={{
                    background: index % 2 === 0 ? "#ffffff" : "#f8fafc"
                  }}
                >
                  <td style={tdStyle}>{item.title}</td>
                  <td style={tdStyle}>{item.type}</td>
                  <td style={tdStyle}>
                    {item.fileUrl ? (
                      <a href={item.fileUrl} target="_blank" rel="noreferrer">
                        {item.fileName || "Voir fichier"}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button onClick={() => handleEdit(item)} style={editBtnStyle}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)} style={deleteBtnStyle}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  if (!lesson) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          background: "#f8fafc",
          minHeight: "100vh"
        }}
      >
        <Sidebar />
        <div style={{ flex: 1, padding: 30, marginRight: 240 }}>
          <div style={headerStyle}>
            <h2 style={{ margin: 0 }}>❌ Matière introuvable</h2>
            <button onClick={() => navigate("/ajouter-lessons")} style={cancelBtnStyle}>
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: 30, marginRight: 240 }}>
        <div style={headerStyle}>
          <button onClick={() => navigate("/ajouter-lessons")} style={backBtnStyle}>
            ← Retour
          </button>

          <h2 style={{ margin: "14px 0 0 0", color: "#0f172a" }}>
            📘 {lesson.title}
          </h2>

          <p style={{ marginTop: 8, color: "#64748b" }}>
            Filière: {lesson.filiere} | Année: {lesson.annee === "1" ? "Première année" : "Deuxième année"}
          </p>
        </div>

        <div style={formCardStyle}>
          <h3 style={{ marginTop: 0 }}>
            {editId ? "✏️ Modifier un élément" : "➕ Ajouter un élément"}
          </h3>

          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ex: Cours 1"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                style={inputStyle}
              >
                <option value="cours">Cours</option>
                <option value="exercice">Exercice</option>
                <option value="examen">Examen</option>
                <option value="tp">Travaux Pratiques</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Fichier</label>
              <input
                id="lesson-file-input"
                type="file"
                onChange={(e) => handleChange("file", e.target.files[0])}
                style={inputStyle}
              />
              <p style={{ marginTop: 8, color: "#64748b", fontSize: 13 }}>
                {formData.file
                  ? `Fichier sélectionné: ${formData.file.name}`
                  : editId
                  ? "Choisissez un nouveau fichier seulement si vous voulez le remplacer."
                  : "Choisissez un fichier à envoyer."}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={handleSubmit} style={saveBtnStyle}>
              {editId ? "Save Changes" : "Ajouter"}
            </button>

            {editId && (
              <button onClick={resetForm} style={cancelBtnStyle}>
                Cancel
              </button>
            )}
          </div>
        </div>

        {renderTable("📚 Cours", grouped.cours)}
        {renderTable("📝 Exercices", grouped.exercice)}
        {renderTable("📄 Examens", grouped.examen)}
        {renderTable("🧪 Travaux Pratiques", grouped.tp)}
      </div>
    </div>
  );
}

const headerStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0"
};

const formCardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0"
};

const tableCardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0"
};

const tableTitleStyle = {
  margin: "0 0 16px 0",
  color: "#0f172a"
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: "600",
  color: "#334155"
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: 14,
  background: "#fff"
};

const thStyle = {
  padding: "14px 12px",
  textAlign: "left",
  fontSize: 14,
  fontWeight: "700"
};

const tdStyle = {
  padding: "14px 12px",
  textAlign: "left",
  borderBottom: "1px solid #e2e8f0",
  color: "#0f172a",
  verticalAlign: "top"
};

const backBtnStyle = {
  border: "none",
  background: "#e2e8f0",
  color: "#0f172a",
  borderRadius: 10,
  padding: "10px 14px",
  cursor: "pointer",
  fontWeight: "600"
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
  padding: "11px 16px",
  cursor: "pointer",
  fontWeight: "600"
};

const cancelBtnStyle = {
  border: "none",
  background: "#64748b",
  color: "#fff",
  borderRadius: 10,
  padding: "11px 16px",
  cursor: "pointer",
  fontWeight: "600"
};