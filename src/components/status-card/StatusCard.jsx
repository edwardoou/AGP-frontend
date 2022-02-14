import React from "react";
import "./statuscard.css"

const StatusCard = (props) => {
  return (
    <div className="status-card">
      {/* Icono */}
      <div className="status-card__icon">
        <i className={props.icono}></i>
      </div>
      {/* Info */}
      <div className="status-card__info">
        <h4>{props.cuenta}</h4>
        <span>{props.titulo}</span>
      </div>
    </div>
  );
};

export default StatusCard;
