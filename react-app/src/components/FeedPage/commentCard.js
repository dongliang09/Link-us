import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentInput from "./commentInput";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "./deleteModal";

function CommentCard({ comment, user, postOwner }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [editComment, setEditComment] = useState(false)

  return (
    <div className="border-blue mrg-15p">
      <div>
        <p>"comment user": {user?.firstName} {user?.lastName}</p>
        {postOwner?.id === user.id && <span>Author</span>}
        {sessionUser && user && sessionUser.id === user.id ? <div>
          <button onClick={()=>setEditComment(!editComment)}><span>Edit</span> <i className="fas fa-edit"></i></button>
          <OpenModalButton
              modalComponent={<DeleteModal commentId={comment.id}/>}
              buttonText={<span>Delete <i className="fas fa-trash-alt"></i></span>} />
        </div> : null}
      </div>
      {editComment ? <CommentInput setEdit={setEditComment} comment={comment} formType="edit" /> : <p>"comment content":{comment.content}</p>}
    </div>
  )
}

export default CommentCard
