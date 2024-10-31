import React, { useState } from "react";
import Mission from "../models/missionModel";
import missionStatus from "./utils/missionStatus";

interface Props {
  onAdd: (mission: Mission) => void;
}

const AddMissinComponent: React.FC<Props> = ({ onAdd }) => {
  const URL = "https://reactexambackend.onrender.com/missions";
  const KEY = "8176800";

  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState(missionStatus.Pending);
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState("");

  const handleAddMission = async () => {
    if (name && priority && description) {
      const newMission = new Mission(name, status, priority, description);
      try {
        const response = await fetch(`${URL}/${KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMission),
        });
        const data = await response.json();
        onAdd(data);
        setName("");
        setStatus(missionStatus.Pending);
        setPriority("");
        setDescription("");
      } catch (error) {
        console.error("Error adding the mission:", error);
      }
    } else {
      alert("All fields must be complete");
    }
  };

  const changehandele = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setPriority(target.value);
  };

  return (
    <div className="add-mission">
      <h3>Add new mission</h3>

      <input
        type="text"
        placeholder="enter mission name"
        value={name}
        //@ts-ignore
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={status}
        //@ts-ignore
        onChange={(e) => setStatus(e.target.value as missionStatus)}
      >
        <option value={missionStatus.Pending}>Pending</option>
        <option value={missionStatus.Progress}>In Progress</option>
        <option value={missionStatus.Completed}>Completed</option>
      </select>

      <select value={priority} onChange={changehandele}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        //@ts-ignore
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddMission}>add mission </button>
    </div>
  );
};

export default AddMissinComponent;
