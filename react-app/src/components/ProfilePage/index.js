import React, { useEffect, useContext } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllUsers } from "../../store/user";
import { thunkGetAllEducations } from "../../store/education";
import { thunkGetAllSkills } from "../../store/skill";
import OpenModalButton from "../OpenModalButton";
import AddEducationModal from "./addEducationModal";
import DeleteEducationModal from "./deleteEducationModal";
import default_education from "./default_education.PNG";
import AddSkillModal from "./addSkillModal";
import DeleteSkillModal from "./deleteSkillModal";
import { EasterEggContext } from "../../context/EasterEggContext";
import ProfileEasterEgg from "./profileEasterEggModal";

function ProfilePage() {
  const { userId } = useParams();
  const sesssionUser = useSelector(state=>state.session.user);
  const profileUser = Object.values(useSelector(state=>state.users.allUsers)).find(element=>element.id === Number(userId))
  const currUserEducations = Object.values(useSelector(state=>state.educations.allEducations))
    .filter((element)=>element.user_id === Number(userId));
  const currUserSkills = Object.values(useSelector(state=>state.skills.allSkills))
    .filter((element)=>element.user_id === Number(userId));
  const dispatch = useDispatch();
  const { easterEggFound, setEasterEggFound } = useContext(EasterEggContext);

  useEffect(()=> {
    dispatch(thunkGetAllUsers());
    dispatch(thunkGetAllEducations());
    dispatch(thunkGetAllSkills());
  },[dispatch])

  if (!sesssionUser) return <Redirect to="/"/>

  return (
    <div className="bg-gray pad-t-150rem">
      <div className="flx-col gap-15p width-max-1000p mrg-lr-auto ">


        <div className="bg-white borderR-15p pad-15p">
          <div className="fontS-175rem pad-15p">
            {profileUser ? profileUser.firstName+" "+profileUser.lastName : "This user doesn't exist"}
            {profileUser?.id === 5 ? <OpenModalButton
                modalComponent={<ProfileEasterEgg />}
                onButtonClick={()=>{
                  easterEggFound["profile"] = true
                  setEasterEggFound(easterEggFound)
                }}
                buttonText={<span><i class="fas fa-star"></i> Developer</span>}
                customizeStyle="mrg-lr-15p mrg-tb-auto bg-white border-0p borderR-5p fontS-115rem bg-main-blue-hover color-white-hover pad-5p"
              /> : null}
          </div>
        </div>


        <div className="flx-col bg-white borderR-15p pad-lr-150rem fontS-115rem">
          <div className="flx flx-jc-sb pad-lr-15p pad-t-150rem pad-b-050rem">
            <span className="fontS-135rem mrg-tb-auto">Education</span>
            <div>
              {Number(userId) === sesssionUser.id && <OpenModalButton
                modalComponent={<AddEducationModal formType="create"/>}
                buttonText={<i className="fas fa-plus"></i>}
                customizeStyle="bg-white border-0p fontS-115rem borderR-50per bg-gray-hover width-250rem hgt-250rem"
              />}
            </div>
          </div>
          {currUserEducations.length === 0 ?
            Number(userId) !== sesssionUser.id ?
              <div className="pad-15p">This user didn't add any edcuation yet.</div> :
              <div className="flx-col gap-10p pad-15p color-main-gray">
                <div>You didn't add any education yet.</div>
                <div>Click the + sign on the right to add your first education</div>
              </div>
            : currUserEducations.map((education, idx)=><div key={idx}>
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


        <div className="flx-col bg-white borderR-15p pad-lr-150rem fontS-115rem">
          <div className="flx flx-jc-sb pad-lr-15p pad-t-150rem pad-b-050rem">
            <span className="fontS-135rem mrg-tb-auto">Skill</span>
            <div>
              {Number(userId) === sesssionUser.id && <OpenModalButton
                modalComponent={<AddSkillModal formType="create" skillOwned={currUserSkills}/>}
                buttonText={<i className="fas fa-plus"></i>}
                customizeStyle="bg-white border-0p fontS-115rem borderR-50per bg-gray-hover width-250rem hgt-250rem"
              />}
            </div>
          </div>
          {currUserSkills.length === 0 ?
            Number(userId) !== sesssionUser.id ?
              <div className="pad-15p">This user didn't add any skill yet.</div> :
              <div className="flx-col gap-10p pad-15p color-main-gray">
                <div>You didn't add any skill yet.</div>
                <div>Click the + sign on the right to add your first skill</div>
              </div>
            : currUserSkills.map((skill, idx)=><div key={idx}>
              <div className="flx flx-jc-sb  pad-15p">
                <div className="flx gap-15p">
                  <div>{skill.skill}</div>
                </div>
                {Number(userId) === sesssionUser.id && <div className="flx gap-15p">
                  <div>
                    <OpenModalButton modalComponent={<AddSkillModal formType="edit" skillData={skill}/>}
                      buttonText={<span><i className="fas fa-edit"></i> Update </span>}
                      customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
                  </div>
                  <div>
                    <OpenModalButton modalComponent={<DeleteSkillModal skillId={skill.id} />}
                      buttonText={<span><i className="fas fa-trash-alt"></i> Delete </span>}
                      customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
                  </div>
                </div>}
              </div>
              {idx !== currUserSkills.length - 1 ? <div className="hgt-2p bg-gray"/> : null}
            </div>)
          }
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default ProfilePage;
