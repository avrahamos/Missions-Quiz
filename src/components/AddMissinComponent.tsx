import React,{useState} from 'react'
import Mission from '../models/missionModel';
import missionStatus from "./utils/missionStatus";

interface Props {
  onAdd: (mission: Mission) => void;
}


const AddMissinComponent:React.FC<Props> = ({onAdd}) => {
    const URL = "https://reactexambackend.onrender.com/missions";
    const KEY = "8176800";

     const [name, setName] = useState("");
     const [status, setStatus] = useState(missionStatus.Pending);
     const [priority, setPriority] = useState("low");
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
      setPriority("low");
      setDescription("");
    } catch (error) {
      console.error("Error adding the mission:", error);
    }
  } else {
    alert("All fields must be complete");
  }
};

  return (
    <div>AddMissinComponent</div>
  )
}

export default AddMissinComponent