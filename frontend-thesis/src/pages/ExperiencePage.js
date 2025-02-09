import { useNavigate } from "react-router-dom";

function ExperiencePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/map")}>Back</button>
      <h2>Experience</h2>
      <p>Background about specific experience...</p>
      <button onClick={() => navigate("/ar")}>Start AR</button>
    </div>
  );
}

export default ExperiencePage;
