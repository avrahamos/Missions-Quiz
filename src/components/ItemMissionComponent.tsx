import React, { useState } from "react";
import missionStatus from "./utils/missionStatus";
import Mission from "../models/missionModel";

interface Props {
  mission: Mission;
  onDelete: (id: string) => void;
  onProgress: (id: string) => void;
  onEnd: (id: string) => void;
}

const ItemMissionComponent: React.FC<Props> = ({
  mission,
  onDelete,
  onProgress,
  onEnd,
}) => {
  const [status, setStatus] = useState(
    mission.status.trim() 
  );

  const handleButtonClick = () => {
    if (status === missionStatus.Pending.trim()) {
      onProgress(mission._id!);
      setStatus(missionStatus.Progress.trim());
    } else if (status === missionStatus.Progress.trim()) {
      onEnd(mission._id!);
      setStatus(missionStatus.Completed.trim());
    }
  };

  return (
    <div className={`mission-item mission-${status}`}>
      <h3>Name: {mission.name}</h3>
      <p>Priority: {mission.priority}</p>
      <p>Description: {mission.description}</p>
      <div>
        <button
          className="delete-button"
          onClick={() => onDelete(mission._id!)}
        >
          DELETE
        </button>
        {status !== missionStatus.Completed.trim() && (
          <button
            className={`mission-button ${
              status === missionStatus.Pending.trim() ? "pending" : "completed"
            }`}
            onClick={handleButtonClick}
          >
            {status === missionStatus.Pending.trim() ? "Progress" : "Complete"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemMissionComponent;
