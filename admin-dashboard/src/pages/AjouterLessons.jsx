import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  getLessons,
  addLesson,
  updateLesson,
  deleteLesson,
} from "../services/apiLessons";

export default function AjouterLessons() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [formData, setFormData] = useState({
    filiere: "EII",
    annee: "1",
    title: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchLessons = async () => {
    const res = await getLessons();
    if (res.success) {
      setLessons(res.lessons || []);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      filiere: "EII",
      annee: "1",
      title: "",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Le titre de la matière est obligatoire");
      return;
    }

    let res;

    if (editId) {
      res = await updateLesson(editId, formData);
    } else {
      res = await addLesson(formData);
    }

    if (res.success) {
      resetForm();
      fetchLessons();
    } else {
      alert(res.message || "Erreur");
    }
  };

  const handleEdit = (lesson) => {
    setEditId(lesson._id);
    setFormData({
      filiere: lesson.filiere,
      annee: lesson.annee,
      title: lesson.title,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Voulez-vous vraiment supprimer cette matière ?");
    if (!ok) return;

    const res = await deleteLesson(id);
    if (res.success) {
      fetchLessons();
    } else {
      alert(res.message || "Erreur lors de la suppression");
    }
  };

  const groupedLessons = useMemo(() => {
    const groups = {
      EII_1: [],
      EII_2: [],
      DAI_1: [],
      DAI_2: [],
      TC_1: [],
      TC_2: [],
      CG_1: [],
      CG_2: [],
    };

    lessons.forEach((lesson) => {
      const key = `${lesson.filiere}_${lesson.annee}`;
      if (groups[key]) groups[key].push(lesson);
    });

    return groups;
  }, [lessons]);

  const renderTable = (title, items) => (
    <div style={tableCardStyle}>
      <h3 style={tableTitleStyle}>{title}</h3>

      {items.length === 0 ? (
        <p style={{ color: "#64748b", marginTop: 10 }}>Aucune matière</p>
      ) : (
        <div style={lessonListStyle}>
          {items.map((item) => (
            <div key={item._id} style={lessonRowStyle}>
              <button
                style={lessonBtnStyle}
                onClick={() => navigate("/lesson-contents", { state: { lesson: item } })}
                title="Gérer le contenu de cette matière"
              >
                {item.title}
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={editBtnStyle}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  style={deleteBtnStyle}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: 30, marginRight: 240 }}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: "#0f172a" }}>📚 Partager Cours</h2>
          <p style={{ marginTop: 8, color: "#64748b" }}>
            Ajoutez, modifiez et supprimez les matières par filière et année
          </p>
        </div>

        {/* FORM */}
        <div style={formCardStyle}>
          <h3 style={{ marginTop: 0, color: "#0f172a" }}>
            {editId ? "✏️ Modifier une matière" : "➕ Ajouter une matière"}
          </h3>

          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Filière</label>
              <select
                value={formData.filiere}
                onChange={(e) => handleChange("filiere", e.target.value)}
                style={inputStyle}
              >
                <option value="EII">EII</option>
                <option value="DAI">DAI</option>
                <option value="TC">TC</option>
                <option value="CG">CG</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Année</label>
              <select
                value={formData.annee}
                onChange={(e) => handleChange("annee", e.target.value)}
                style={inputStyle}
              >
                <option value="1">Première année</option>
                <option value="2">Deuxième année</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Titre de la matière</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Ex: Math"
                style={inputStyle}
              />
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

        {/* TABLES */}
        <div style={tablesGridStyle}>
          {renderTable("EII - Première année", groupedLessons.EII_1)}
          {renderTable("EII - Deuxième année", groupedLessons.EII_2)}

          {renderTable("DAI - Première année", groupedLessons.DAI_1)}
          {renderTable("DAI - Deuxième année", groupedLessons.DAI_2)}

          {renderTable("TC - Première année", groupedLessons.TC_1)}
          {renderTable("TC - Deuxième année", groupedLessons.TC_2)}

          {renderTable("CG - Première année", groupedLessons.CG_1)}
          {renderTable("CG - Deuxième année", groupedLessons.CG_2)}
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const headerStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0",
};

const formCardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: "600",
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: 14,
  background: "#fff",
};

const saveBtnStyle = {
  border: "none",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 10,
  padding: "11px 16px",
  cursor: "pointer",
  fontWeight: "600",
};

const cancelBtnStyle = {
  border: "none",
  background: "#64748b",
  color: "#fff",
  borderRadius: 10,
  padding: "11px 16px",
  cursor: "pointer",
  fontWeight: "600",
};

const tablesGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
};

const tableCardStyle = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 8px 30px rgba(15,23,42,0.06)",
  border: "1px solid #e2e8f0",
};

const tableTitleStyle = {
  margin: 0,
  marginBottom: 16,
  color: "#0f172a",
  fontSize: 18,
};

const lessonListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const lessonRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid #e2e8f0",
};

const lessonBtnStyle = {
  border: "none",
  background: "#dbeafe",
  color: "#1d4ed8",
  borderRadius: 10,
  padding: "10px 14px",
  fontWeight: "600",
  cursor: "pointer",
};

const editBtnStyle = {
  border: "none",
  background: "#2e86de",
  color: "#fff",
  borderRadius: 10,
  padding: "8px 12px",
  cursor: "pointer",
  fontWeight: "600",
};

const deleteBtnStyle = {
  border: "none",
  background: "#ef4444",
  color: "#fff",
  borderRadius: 10,
  padding: "8px 12px",
  cursor: "pointer",
  fontWeight: "600",
};