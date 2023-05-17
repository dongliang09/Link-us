import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateNewSkill, thunkUpdateSkill } from "../../store/skill";
import { useModal } from "../../context/Modal";

function AddSkillModal({ formType, skillData, skillOwned }) {
  // originally thinking no edit for skill since it might be a short word.
  // but it is nice to have it

  // skillData is passed to this component when the formType is "edit"
  // skillOwned is passed to this component when the formType is "create"

  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const [suggestionBox, setSuggestionBox] = useState(true);
  const { closeModal } = useModal();

  // filter out skills the user already have, rest of them(ie. userSkill) will be in suggestion container
  const skillSet = ["Teamwork", "Microsoft Word", "Microsoft Excel", "Public Speaking", "Customer Service",
                     "Leadership", "Problem Solving", "Attention To Detail", "Time Management", "Critical Thinking"]
  const userSkill = [];
  const skillSuggestion = [];
  skillOwned.forEach(skill => {
    userSkill.push(skill.skill)
  })
  skillSet.forEach(skill => {
    if (!userSkill.includes(skill)) skillSuggestion.push(skill)
  })

  async function checkSkillInput(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      // make every word capitalized
      let words = skill.split(" ");
      for( let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
      }

      // store into database
      if (formType === "create") {
        await dispatch(thunkCreateNewSkill({skill: words.join(" ")}))
      } else {
        await dispatch(thunkUpdateSkill(skillData.id, {skill: words.join(" ")}))
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
    if (skill.length > 75) error.skill = "Skill only accepts maximum of 75 characters";
    setError(error);
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

    <div>
      {submitted && Object.values(error).map((error, idx) => (
        <div key={idx} className='color-red'>{error}</div>
      ))}
    </div>

    <form onSubmit={(e)=>checkSkillInput(e)}
      className="flx-col gap-15p width-2000rem width-max-300p">
      <div className="flx-col gap-5p">
        <label className="color-main-gray">Skill*</label>
        <input value={skill} onChange={(e)=>setSkill(e.target.value)} required
          placeholder="Ex: JavaScript" className="fontS-115rem pad-l-5p"/>
      </div>
      {suggestionBox ?
        <div>
          <div>
            <span>Suggestion for general skills</span>
            <button type="button" onClick={()=>setSuggestionBox(false)}>x</button>
            <div className="flx">
              {skillSuggestion.map((suggestion,idx) => (
                <span key={idx}>{suggestion}</span>
              ))}
            </div>
          </div>
        </div>
        : null}
      <button className="bg-main-blue color-white pad-tb-10p fontW-600 bg-deep-blue-hover border-0p borderR-10p">
        Save
      </button>
    </form>
  </div>
  )
}

export default AddSkillModal;
