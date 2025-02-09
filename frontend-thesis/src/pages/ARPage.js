import { useNavigate } from "react-router-dom";

function ARPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/experience")}>Back</button>
      <h2>AR Page</h2>
      <p>AR content here...</p>
      <button>Capture</button>
    </div>
  );
}

export default ARPage;
