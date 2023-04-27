import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllEducations } from "../../store/education";
import default_education from "./default_education.PNG"

function ProfilePage() {
  const { userId } = useParams();
  const sesssionUser = useSelector(state=>state.session.user);
  const currUserEducations = Object.values(useSelector(state=>state.educations.allEducations))
    .filter((element)=>element.user_id === Number(userId));
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(thunkGetAllEducations())
  },[dispatch])

  return (
    <div className="bg-gray pad-t-150rem">
      <div className="flx-col gap-15p width-max-1000p mrg-lr-auto ">
        <div className="bg-white borderR-15p pad-15p">
          <div>Banner</div>
          <div>basic info</div>
        </div>
        <div className="flx-col bg-white borderR-15p pad-lr-150rem fontS-115rem">
          <div className="flx flx-jc-sb pad-lr-15p pad-t-150rem pad-b-050rem">
            <span className="fontS-135rem">Education</span>
            <div>
              <button className="bg-white border-0p fontS-115rem borderR-50per bg-gray-hover">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
          {currUserEducations.map((education, idx)=><div key={idx}>
            <div className="flx gap-15p pad-15p">
              <div><img src={default_education} alt="default img" className="width-max-50p"/></div>
              <div>
                <div>{education.school}</div>
                <div className="color-main-gray fontS-init">{education.major}</div>
              </div>
            </div>
            {idx !== currUserEducations.length - 1 ? <div className="hgt-2p bg-gray"/> : null}
          </div>)}

        </div>
        <div>Skill</div>
      </div>
    </div>
  )
}

export default ProfilePage;
