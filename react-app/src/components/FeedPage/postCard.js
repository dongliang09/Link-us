import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostInputPlain from "./postInputPlain";
import DeleteModal from "./deleteModal";

function PostCard({post, user}) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="border-red">
      <div>
        <p><i className="fas fa-user-circle fontS-300rem"></i> {user?user.firstName:null} {user?user.lastName:null}</p>
        {sessionUser && user && sessionUser.id === user.id ? <div>
            <OpenModalButton
              modalComponent={<PostInputPlain formType={"edit"} post={post}/>}
              buttonText={<span>Update <i className="fas fa-edit"></i></span>} />
            <OpenModalButton
              modalComponent={<DeleteModal postId={post.id}/>}
              buttonText={<span>Delete <i className="fas fa-trash-alt"></i></span>} />
        </div> : null}
      </div>
      <p>"post content":{post.content}</p>
    </div>
  )
}

export default PostCard
