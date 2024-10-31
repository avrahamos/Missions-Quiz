import React, { useState, useEffect } from "react";
import Mission from "../models/missionModel";
import missionStatus from "./utils/missionStatus";
import ItemMissionComponent from "./ItemMissionComponent";

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
  const handleProgress = async (id: string) => {
    try {
      const updatedMission = await fetch(`${URL}/${KEY}/progress/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: missionStatus.Progress }),
      });
      const data = await updatedMission.json();
      setMissions(
        missions.map((mission) => (mission.id === id ? data : mission))
      );
    } catch (error) {
      console.error("Error updating the mission:", error);
    }
  };

  const handleEnd = async (id: string) => {
    try {
      const updatedMission = await fetch(`${URL}/${KEY}/progress/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: missionStatus.Completed }),
      });
      const data = await updatedMission.json();
      setMissions(
        missions.map((mission) => (mission.id === id ? data : mission))
      );
    } catch (error) {
      console.error("Error at the end of the task:", error);
    }
  };



 return (
   <div>
     {missions.map((mission) => (
       <ItemMissionComponent
         key={mission.id}
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
