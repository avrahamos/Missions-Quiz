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
  const getStatusColor = () => {
    switch (mission.status) {
      case missionStatus.Pending:
        return "red";
      case missionStatus.Progress:
        return "orange";
      case missionStatus.Completed:
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div
      style={{
        backgroundColor: getStatusColor(),
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
      }}
    >
      <h3>{mission.name}</h3>
      <p>Priority: {mission.priority}</p>
      <p>{mission.description}</p>
      <div>
        <button
          onClick={() => onDelete(mission.id)}
          style={{ color: "white", backgroundColor: "red" }}
        >
            delete
        </button>
        {mission.status === missionStatus.Pending && (
          <button
            onClick={() => onProgress(mission.id)}
            style={{
              color: "white",
              backgroundColor: "green",
              marginLeft: "5px",
            }}
          >
            Progress
          </button>
        )}
        {mission.status === missionStatus.Progress && (
          <button
            onClick={() => onEnd(mission.id)}
            style={{
              color: "white",
              backgroundColor: "blue",
              marginLeft: "5px",
            }}
          >
            Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemMissionComponent;
