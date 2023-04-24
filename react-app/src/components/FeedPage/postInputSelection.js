import React from "react";
import OpenModalButton from "../OpenModalButton"
import PostInputPlain from './postInputPlain'

function PostInputSelection({user}) {

  return (
    <div className="flx bg-white pad-15p borderR-10p boxS-0-0-2-gray">
      <i className="fas fa-user-circle fontS-300rem"></i> {user?.firstName}
        <OpenModalButton
          modalComponent={<PostInputPlain formType={"create"}/>}
          buttonText={"Start a post"}
          customizeStyle="width-100per bg-gray border-main-gray borderR-30p pad-tb-15p pad-l-13p"/>
    </div>
  )
}

export default PostInputSelection
