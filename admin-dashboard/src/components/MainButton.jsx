export default function MainButton({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 110,
        borderRadius: 16,
        background: "linear-gradient(135deg, #3B82F6, #6366F1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        fontSize: 17,
        fontWeight: "600",
        color: "#fff",
        transition: "0.3s",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
      }}
      onMouseOver={(e)=> {
        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
      }}
      onMouseOut={(e)=> {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {title}
    </div>
  );
}