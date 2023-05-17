import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSkill } from "../../store/skill";

function DeleteSkillModal({skillId}) {
  const dispatch = useDispatch()
  const { closeModal } = useModal();

  const handleDelete = async (skillId) => {
    dispatch(thunkDeleteSkill(skillId))
    closeModal()
  }

  return (
    <div className="pad-15p">
      <h1>Delete skill?</h1>
      <p>Are you sure you want to permanently remove this skill?</p>
      <div>
        <button onClick={()=>{handleDelete(skillId)}}
          className = "width-fit pad-10p border-0p borderR-15p bg-main-blue bg-deep-blue-hover color-white">
          Delete
        </button>
        <button onClick={()=>closeModal()}
          className="width-fit pad-10p border-0p borderR-15p mrg-l-10p">Cancel</button>
      </div>
    </div>
  )
}

export default DeleteSkillModal
