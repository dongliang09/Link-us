import React from "react";
import { useParams } from 'react-router-dom'

function ProfilePage() {
  const { userId } = useParams()

  return (
    <div>
      <h1>ProfilePage, under construction</h1>
      <h1>intro section</h1>
      <div>
        <div>Banner</div>
        <div>basic info</div>
      </div>
      <div>Education</div>
      <div>Skill</div>
    </div>
  )
}

export default ProfilePage;
