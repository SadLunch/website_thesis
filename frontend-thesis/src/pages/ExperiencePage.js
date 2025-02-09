import { useNavigate, useParams } from "react-router-dom";
import { useContext } from  'react'
import { ExperienceContext } from "../context/ExperienceContext";
import BackButton from "../Components/BackButton";

function ExperiencePage() {
  const navigate = useNavigate();
  const { experiences } = useContext(ExperienceContext);
  const { id } = useParams();

  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) return <p>Experience not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <BackButton to="/map"/>
      <h1>{experience.name}</h1>
      <p><strong>Location:</strong> {experience.location}</p>
      <p>{experience.description}</p>
      <button onClick={() => navigate("/ar")}>Start AR</button>
    </div>
  );
}

export default ExperiencePage;
