import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateNewSkill, thunkUpdateSkill } from "../../store/skill";
import { useModal } from "../../context/Modal";

function AddSkillModal({ formType, skillData }) {
  // originally thinking no edit for skill since it might be a short word.
  // but it is nice to have it
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const { closeModal } = useModal();

  async function checkSkillInput(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      if (formType === "create") {
        await dispatch(thunkCreateNewSkill({skill}))
      } else {
        await dispatch(thunkUpdateSkill(skillData.id, {skill}))
      }
      closeModal()
    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=> {
    // populate info on first render
    if (formType === "edit") {
      setSkill(skillData.skill)
    }
    return (() => {
      setError({});
      setSkill("")
    })
  },[]);

  useEffect(()=> {
    let error = {};
    if (skill.length > 75) error.school = "Skill only accepts maximum of 75 characters"
  }, [skill])

  return (
  <div className="pad-15p">

    <div className="flx flx-jc-sb">
      <h2>{formType === "create" ? "Add" : "Update"} Skill</h2>
      <button  onClick={()=>closeModal()} className="fontS-115rem width-250rem hgt-250rem bg-gray-hover border-0p borderR-50per bg-white mrg-tb-auto">
        <i className="fas fa-times"></i>
      </button>
    </div>

    <p>* indicates required</p>

    <ul>
      {submitted && Object.values(error).map((error, idx) => (
        <li key={idx} className='color-red'>{error}</li>
      ))}
    </ul>

    <form onSubmit={(e)=>checkSkillInput(e)}
      className="flx-col gap-15p width-2000rem width-max-300p">
      <div className="flx-col gap-5p">
        <label className="color-main-gray">School*</label>
        <input value={skill} onChange={(e)=>setSkill(e.target.value)} required
          placeholder="Ex: Boston University" className="fontS-115rem pad-l-5p"/>
      </div>
      <button className="bg-main-blue color-white pad-tb-10p fontW-600 bg-deep-blue-hover border-0p borderR-10p">
        Save
      </button>
    </form>
  </div>
  )
}

export default AddSkillModal;
