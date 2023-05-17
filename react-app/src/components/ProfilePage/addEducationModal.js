import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateNewEducation, thunkUpdateEducation } from "../../store/education";
import { useModal } from "../../context/Modal";

function AddEducationModal({ formType, educationData }) {
  const dispatch = useDispatch();
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [major, setMajor] = useState(null);
  const [degree, setDegree] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});
  const { closeModal } = useModal();

  async function checkEducationInput(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      if (formType === "create") {
        await dispatch(thunkCreateNewEducation({major, degree, school, city}))
      } else {
        await dispatch(thunkUpdateEducation(educationData.id, {major, degree, school, city}))
      }
      closeModal()
    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=> {
    // populate info on first render
    if (formType === "edit") {
      setSchool(educationData.school)
      setCity(educationData.city)
      setMajor(educationData.major)
      setDegree(educationData.degree)
    }
    return (() => {
      setError({});
      setSchool("")
      setCity("");
      setMajor("")
      setDegree("")
    })
  },[]);

  useEffect(()=> {
    let error = {};
    if (school.length > 75) error.school = "School only accepts maximum of 75 characters"
    if (city.length > 75) error.city = "City only accepts maximum of 75 characters"
    if (major && major.length > 75) error.major = "Major only accepts maximum of 75 characters"
    if (degree && degree.length > 75) error.degree = "Degree only accepts maximum of 75 characters"
    setError(error)
  }, [school, major,city, degree])

  return (
  <div className="pad-15p">

    <div className="flx flx-jc-sb">
      <h2>{formType === "create" ? "Add" : "Update"} Education</h2>
      <button  onClick={()=>closeModal()} className="fontS-115rem width-250rem hgt-250rem bg-gray-hover border-0p borderR-50per bg-white mrg-tb-auto">
        <i className="fas fa-times"></i>
      </button>
    </div>

    <p>* indicates required</p>

    <div className="mrg-b-15p">
      {submitted && Object.values(error).map((error, idx) => (
        <div key={idx} className='color-red'>{error}</div>
      ))}
    </div>

    <form onSubmit={(e)=>checkEducationInput(e)}
      className="flx-col gap-15p width-2000rem width-max-300p">
      <div className="flx-col gap-5p">
        <label className="color-main-gray">School*</label>
        <input value={school} onChange={(e)=>setSchool(e.target.value)} required
          placeholder="Ex: Boston University" className="fontS-115rem pad-l-5p"/>
      </div>
      <div className="flx-col gap-5p">
        <label className="color-main-gray">City*</label>
        <input value={city} onChange={(e)=>setCity(e.target.value)} required
          placeholder="Ex: Boston" className="fontS-115rem pad-l-5p"/>
      </div>
      <div className="flx-col gap-5p">
        <label className="color-main-gray">Degree</label>
        <input value={degree} onChange={(e)=>setDegree(e.target.value)}
          placeholder="Ex: Bachelor of Art" className="fontS-115rem pad-l-5p"/>
      </div>
      <div className="flx-col gap-5p">
        <label className="color-main-gray">Field of Study</label>
        <input value={major} onChange={(e)=>setMajor(e.target.value)}
          placeholder="Ex: Business" className="fontS-115rem pad-l-5p"/>
      </div>
      <button className="bg-main-blue color-white pad-tb-10p fontW-600 bg-deep-blue-hover border-0p borderR-10p">
        Save
      </button>
    </form>
  </div>
  )
}

export default AddEducationModal;
