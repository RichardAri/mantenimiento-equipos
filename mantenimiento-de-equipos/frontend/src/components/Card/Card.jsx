import React from "react";
import "./Card.css"; // Aquí defines estilos compartidos para las tarjetas.

const Card = ({ title, description, details, onClick, onEditClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {details && (
        <ul>
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
      {onEditClick && (
        <button
          className="edit-button"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
        >
          ✎
        </button>
      )}
    </div>
  );
};

export default Card;
