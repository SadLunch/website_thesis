import { useNavigate } from "react-router-dom";

function BackButton({ to = "/" }) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(to)} 
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
      }}
    >
      ← Back
    </button>
  );
}

export default BackButton;
