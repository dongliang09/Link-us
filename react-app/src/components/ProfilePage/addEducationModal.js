import React from "react";

function AddEducationModal() {
  return (
    <div>
      <p>* indicates required</p>
      <form>
        <label>School*</label>
        <input placeholder="Ex: Boston University"/>
        <label>Field of Study</label>
        <input placeholder="Ex: Business"/>
      </form>
    </div>
  )
}

export default AddEducationModal;
