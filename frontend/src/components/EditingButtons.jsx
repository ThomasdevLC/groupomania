import React from "react";
import styles from "./EditingButtons.module.scss";

const EditingButtons = ({ isEditing, handleEdit, setIsEditing, onDelete }) => {
  return (
    <div className={`${styles.editContainer} `}>
      {isEditing ? (
        <button className="btn-edit " onClick={() => handleEdit(false)}>
          <i className="fa-solid fa-check "></i>
        </button>
      ) : (
        <button className="btn-edit " onClick={() => setIsEditing(true)}>
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
