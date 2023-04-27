import React from "react";
import { useModal } from "../../context/Modal";

function AddEducationModal() {
  const { closeModal } = useModal();

  return (
  <div className="pad-15p">

    <div className="flx flx-jc-sb">
      <h2>Add Education</h2>
      <button  onClick={()=>closeModal()} className="fontS-115rem width-250rem hgt-250rem bg-gray-hover border-0p borderR-50per bg-white mrg-tb-auto">
        <i className="fas fa-times"></i>
      </button>
    </div>

    <p>* indicates required</p>

    <form onSubmit={()=>console.log("working for submit")} className="flx-col gap-15p">
      <div className="flx-col gap-5p">
        <label>School*</label>
        <input placeholder="Ex: Boston University"/>
      </div>
      <div className="flx-col gap-5p">
        <label>Field of Study</label>
        <input placeholder="Ex: Business"/>
      </div>
      <button className="bg-gray pad-tb-5p fontW-600 bg-main-blue-hover color-white-hover border-0p borderR-10p">
        Save
      </button>
    </form>
  </div>
  )
}

export default AddEducationModal;
