import React from "react";
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
  return (
    <div
      className={`mission-item mission-${mission.status.toLocaleLowerCase()}`}
    >
      <h3>{mission.name}</h3>
      <p>Priority: {mission.priority}</p>
      <p>{mission.description}</p>
      <div>
        <button
          className="delete-button"
          onClick={() => onDelete(mission._id!)}
        >
          DELETE
        </button>
        {mission.status === missionStatus.Pending && (
          <button
            className="progress-button"
            onClick={() => onProgress(mission._id!)}
          >
            in progress
          </button>
        )}
        {mission.status === missionStatus.Progress && (
          <button className="end-button" onClick={() => onEnd(mission._id!)}>
            complete
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemMissionComponent;
