import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllUsers } from "../../store/user";
import { thunkGetAllEducations } from "../../store/education";
import OpenModalButton from "../OpenModalButton";
import AddEducationModal from "./addEducationModal";
import DeleteEducationModal from "./deleteEducationModal";
import default_education from "./default_education.PNG";


function ProfilePage() {
  const { userId } = useParams();
  const sesssionUser = useSelector(state=>state.session.user);
  const profileUser = Object.values(useSelector(state=>state.users.allUsers)).find(element=>element.id === Number(userId))
  const currUserEducations = Object.values(useSelector(state=>state.educations.allEducations))
    .filter((element)=>element.user_id === Number(userId));
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(thunkGetAllUsers());
    dispatch(thunkGetAllEducations());
  },[dispatch])

  return (
    <div className="bg-gray pad-t-150rem">
      <div className="flx-col gap-15p width-max-1000p mrg-lr-auto ">
        <div className="bg-white borderR-15p pad-15p">
          <div className="fontS-175rem pad-15p">{profileUser?.firstName} {profileUser?.lastName}</div>
        </div>
        <div className="flx-col bg-white borderR-15p pad-lr-150rem fontS-115rem">
          <div className="flx flx-jc-sb pad-lr-15p pad-t-150rem pad-b-050rem">
            <span className="fontS-135rem">Education</span>
            <div>
              {Number(userId) === sesssionUser.id && <OpenModalButton
                modalComponent={<AddEducationModal formType="create"/>}
                buttonText={<i className="fas fa-plus"></i>}
                customizeStyle="bg-white border-0p fontS-115rem borderR-50per bg-gray-hover width-250rem hgt-250rem"
              />}
            </div>
          </div>
          {currUserEducations.length === 0 ?
            <div className="pad-15p">This user didn't add any edcuation yet.</div> :
            currUserEducations.map((education, idx)=><div key={idx}>
              <div className="flx flx-jc-sb  pad-15p">
                <div className="flx gap-15p">
                  <div><img src={default_education} alt="default img" className="width-max-50p"/></div>
                  <div>
                    <div>{education.school}</div>
                    <div className="color-main-gray fontS-init">in {education.city}</div>
                    <div className="color-main-gray fontS-init">{education.degree ? education.degree + " -" : ""} {education.major}</div>
                  </div>
                </div>
                {Number(userId) === sesssionUser.id && <div className="flx gap-15p">
                  <div>
                    <OpenModalButton modalComponent={<AddEducationModal formType="edit" educationData={education}/>}
                      buttonText={<span><i className="fas fa-edit"></i> Update </span>}
                      customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
                  </div>
                  <div>
                    <OpenModalButton modalComponent={<DeleteEducationModal educationId={education.id} />}
                      buttonText={<span><i className="fas fa-trash-alt"></i> Delete </span>}
                      customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
                  </div>
                </div>}
              </div>
              {idx !== currUserEducations.length - 1 ? <div className="hgt-2p bg-gray"/> : null}
            </div>)
          }

        </div>
        <div>Skill</div>
      </div>
    </div>
  )
}

export default ProfilePage;
