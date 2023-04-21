import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton"
import PostInputPlain from './postInputPlain'

function PostInputSelection({user}) {

  return (
    <div>
      <div>"current user": {user?.firstName}</div>
      <OpenModalButton
        modalComponent={<PostInputPlain formType={"create"}/>}
        buttonText={"Start a post"} />
    </div>
  )
}

export default PostInputSelection
