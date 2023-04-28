import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";

function AddEducationModal({ formType }) {
  const dispatch = useDispatch();
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const { closeModal } = useModal();

  async function checkEducationInput(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      if (formType === "create") {
        await dispatch('create')
        setSchool("");
        setMajor("");
      } else {
        await dispatch('update')
      }
      closeModal()
    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=> {
    // populate info on first render
    if (formType === "edit") {
      setSchool("something")
      setMajor()
    }
    return (() => {
      setError({});
      setSchool("")
      setMajor("")
    })
  },[]);

  useEffect(()=> {
    let error = {};
    if (school.length > 75) error.school = "School only accepts maximum of 75 characters"
    if (major.length > 75) error.major = "Major only accepts maximum of 75 characters"
  }, [school, major])

  return (
  <div className="pad-15p">

    <div className="flx flx-jc-sb">
      <h2>Add Education</h2>
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

    <form onSubmit={(e)=>checkEducationInput(e)}
      className="flx-col gap-15p width-2000rem width-max-300p">
      <div className="flx-col gap-5p">
        <label className="color-main-gray">School*</label>
        <input placeholder="Ex: Boston University" className="fontS-115rem pad-l-5p"/>
      </div>
      <div className="flx-col gap-5p">
        <label className="color-main-gray">Field of Study</label>
        <input placeholder="Ex: Business" className="fontS-115rem pad-l-5p"/>
      </div>
      <button className="bg-main-blue color-white pad-tb-10p fontW-600 bg-deep-blue-hover border-0p borderR-10p">
        Save
      </button>
    </form>
  </div>
  )
}

export default AddEducationModal;
