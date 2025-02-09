import { createContext, useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]); // Stores experience data

  useEffect(() => {
    // Fetch experiences from the backend when the app starts
    fetch(`${API_URL}/experiences`)
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <ExperienceContext.Provider value={{ experiences }}>
      {children}
    </ExperienceContext.Provider>
  );
};
