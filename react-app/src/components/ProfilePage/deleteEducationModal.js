import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteEducation } from "../../store/education";

function DeleteEducationModal({educationId}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleDelete = async (educationId) => {
    dispatch(thunkDeleteEducation(educationId))
    closeModal()
  }

  return (
    <div className="pad-15p">
      <h1>Delete education?</h1>
      <p>Are you sure you want to permanently remove this education?</p>
      <div>
        <button onClick={()=>{handleDelete(educationId)}}
          className = "width-fit pad-10p border-0p borderR-15p bg-main-blue bg-deep-blue-hover color-white">
          Delete
        </button>
        <button onClick={()=>closeModal()}
          className="width-fit pad-10p border-0p borderR-15p mrg-l-10p">Cancel</button>
      </div>
    </div>
  )
}

export default DeleteEducationModal
