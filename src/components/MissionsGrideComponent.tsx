import React, { useState, useEffect } from "react";
import Mission from "../models/missionModel";
import missionStatus from "./utils/missionStatus";
import ItemMissionComponent from "./ItemMissionComponent";
import AddMissionComponent from "./AddMissinComponent";

const URL = "https://reactexambackend.onrender.com";
const KEY = "8176800";

const MissionsGridComponent: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch(`${URL}/missions/${KEY}`);
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
      await fetch(`${URL}/missions/${KEY}/${id}`, { method: "DELETE" });
      setMissions(missions.filter((mission) => mission._id !== id));
    } catch (error) {
      console.error("Error deleting mission:", error);
    }
  };

  const handleProgress = async (id: string) => {
    try {
      const updatedMission = await fetch(
        `${URL}/missions/${KEY}/progress/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: missionStatus.Progress }),
        }
      );
      const data = await updatedMission.json();
      setMissions(
        missions.map((mission) => (mission._id === id ? data : mission))
      );
    } catch (error) {
      console.error("Error updating the mission:", error);
    }
  };

  const handleEnd = async (id: string) => {
    try {
      const updatedMission = await fetch(
        `${URL}/missions/${KEY}/progress/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: missionStatus.Completed }),
        }
      );
      const data = await updatedMission.json();
      setMissions(
        missions.map((mission) => (mission._id === id ? data : mission))
      );
    } catch (error) {
      console.error("Error at the end of the task:", error);
    }
  };

  const handleAdd = (newMission: Mission) => {
    setMissions([...missions, newMission]);
  };

  return (
    <div>
      <AddMissionComponent onAdd={handleAdd} />
      {missions.map((mission) => (
        <ItemMissionComponent
          key={mission._id}
          mission={mission}
          onDelete={handleDelete}
          onProgress={handleProgress}
          onEnd={handleEnd}
        />
      ))}
    </div>
  );
};

export default MissionsGridComponent;
