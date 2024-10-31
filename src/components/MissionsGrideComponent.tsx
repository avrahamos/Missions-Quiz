import React, { useState, useEffect } from "react";
import Mission from "../models/missionModel";

const URL = "https://reactexambackend.onrender.com/missions";
const KEY = "8176800";

const MissionsGridComponent = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(`${URL}/${KEY}`);
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };
    fetchMissions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${URL}/${KEY}/${id}`, { method: "DELETE" });
      setMissions(missions.filter((mission) => mission.id !== id));
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  return;
  <div>MissionsGridComponent</div>;
};

export default MissionsGridComponent;
