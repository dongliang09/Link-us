import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostInputPlain from "./postInputPlain";
import DeletePostModal from "./deletePostModal";

function PostCard({post, user}) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="border-red">
      <div>
        <p>"user": {user?user.firstName:null} {user?user.lastName:null}</p>
        {sessionUser && user && sessionUser.id === user.id ? <div>
            <OpenModalButton
              modalComponent={<PostInputPlain formType={"edit"} post={post}/>}
              buttonText={<span>update<i className="fas fa-edit"></i></span>} />
            <OpenModalButton
              modalComponent={<DeletePostModal postId={post.id}/>}
              buttonText={<span>delete<i className="fas fa-trash-alt"></i></span>} />
        </div> : null}
      </div>
      <p>"post content":{post.content}</p>
    </div>
  )
}

export default PostCard
