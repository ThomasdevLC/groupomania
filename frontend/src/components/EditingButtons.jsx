import React from "react";

const EditingButtons = ({ isEditing, handleEdit, setIsEditing, onDelete }) => {
  return (
    <div className="p-10">
      {isEditing ? (
        <button
          className="btn btn-primary mr-5"
          onClick={() => handleEdit(false)}
        >
          <i className="fa-solid fa-pen mr-5"></i>Valider
        </button>
      ) : (
        <button
          className="btn btn-primary mr-5"
          onClick={() => setIsEditing(true)}
        >
          <i className="fa-solid fa-pen mr-5"></i>Modifier
        </button>
      )}
      <button className="btn btn-primary" onClick={() => onDelete()}>
        <i className="fa-sharp fa-solid fa-trash mr-5"></i> Supprimer
      </button>
    </div>
  );
};

export default EditingButtons;
