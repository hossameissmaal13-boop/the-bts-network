import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "./pages/DashboardHome";
import AdminLogin from "./pages/AdminLogin";
import Students from "./pages/Students";
import Lessons from "./pages/Lessons";
import Post from "./pages/Post";
import AjouterEtudiant from "./pages/AjouterEtudiant";
import AjouterPost from "./pages/AjouterPost";
import PosterMessage from "./pages/PosterMessage";
import AjouterLessons from "./pages/AjouterLessons";
import LessonsContentsManager from "./pages/LessonsContentsManager";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/students" element={<Students />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/post" element={<Post />} />
        <Route path="/ajouter-etudiant" element={<AjouterEtudiant />} />
        <Route path="/ajouter-post" element={<AjouterPost />} />
        <Route path="/poster-message" element={<PosterMessage />} />
        <Route path="/ajouter-lessons" element={<AjouterLessons />} />
        <Route path="/lesson-contents" element={<LessonsContentsManager />} />
      </Routes>
    </Router>
  );
}