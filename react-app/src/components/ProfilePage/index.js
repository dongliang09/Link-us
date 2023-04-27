import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllEducations } from "../../store/education";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currUserEducations = Object.values(useSelector(state=>state.educations.allEducations))
    .filter((element)=>element.user_id === Number(userId));

  useEffect(()=> {
    dispatch(thunkGetAllEducations())
  },[dispatch])

  return (
    <div>
      <h1>ProfilePage, under construction</h1>
      <h1>intro section</h1>
      <div>
        <div>Banner</div>
        <div>basic info</div>
      </div>
      <div className="flx-col">
        <div>Education + button</div>
        {currUserEducations.map((education)=><div className="flx gap-15p">
          <div>icon</div>
          <div>
            <div>name {education.school}</div>
            <div>major {education.major}</div>
          </div>
        </div>)}

      </div>
      <div>Skill</div>
    </div>
  )
}

export default ProfilePage;
