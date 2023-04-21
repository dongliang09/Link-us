import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostInputPlain from "./postInputPlain";
import DeletePostModal from "./deletePostModal";

function CommentCard({ comment, user, postOwner }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="border-blue mrg-15p">
      <div>
        <p>"comment user": {user.firstName} {user.lastName}</p>
        {postOwner.id === user.id && <span>Author</span>}
        {sessionUser && user && sessionUser.id === user.id ? <div>
            <OpenModalButton
              modalComponent={<PostInputPlain formType={"edit"} post={comment}/>}
              buttonText={<span>update<i className="fas fa-edit"></i></span>} />
            <OpenModalButton
              modalComponent={<DeletePostModal postId={comment.id}/>}
              buttonText={<span>delete<i className="fas fa-trash-alt"></i></span>} />
        </div> : null}
      </div>
      <p>"comment content":{comment.content}</p>
    </div>
  )
}

export default CommentCard
