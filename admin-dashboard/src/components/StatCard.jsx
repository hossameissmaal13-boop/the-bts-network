export default function StatCard({ title, number, color }) {
  return (
    <div style={{
      background: "#fff",
      padding: 25,
      borderRadius: 16,
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      borderLeft: `6px solid ${color}`
    }}>
      <p style={{
        margin: 0,
        color: "#6b7280",
        fontSize: 14
      }}>
        {title}
      </p>

      <h2 style={{
        marginTop: 10,
        fontSize: 30,
        color: "#111827"
      }}>
        {number}
      </h2>
    </div>
  );
}