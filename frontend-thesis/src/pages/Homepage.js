import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Project Name</h1>
      <p>Text about the overall experience...</p>
      <button onClick={() => navigate("/map")}>Go To Map</button>
    </div>
  );
}

export default Homepage;
