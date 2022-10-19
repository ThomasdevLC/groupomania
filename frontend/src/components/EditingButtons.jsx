import React from "react";

const EditingButtons = ({ isEditing, handleEdit, setIsEditing, onDelete }) => {
  return (
    <div className="p-10">
      {isEditing ? (
        <button className="btn-edit mr-5" onClick={() => handleEdit(false)}>
          <i className="fa-solid fa-check "></i>
        </button>
      ) : (
        <button className="btn-edit mr-5" onClick={() => setIsEditing(true)}>
          <i className="fa-solid fa-pen "></i>
        </button>
      )}
      <button className="btn-edit" onClick={() => onDelete()}>
        <i className="fa-sharp fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default EditingButtons;
