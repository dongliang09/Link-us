import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentInput from "./commentInput";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "./deleteModal";

function CommentCard({ comment, user, postOwner }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [editComment, setEditComment] = useState(false)

  // dafault profile pic to be light blue for other users, black for current user
  let profileColor = (postOwner?.id !== user?.id ? "color-second-blue" : "") + " fas fa-user-circle fontS-300rem"

  return (
    <div className="mrg-15p grid-1-9">
      <div><i className={profileColor}></i></div>
      <div className="bg-gray pad-5p borderR-5p">
        <div className="flx-jc-sb">
          <div> {user?.firstName} {user?.lastName}
            {postOwner?.id === user?.id && <div className="color-white bg-main-gray in-block mrg-l-10p pad-5p borderR-5p">Author</div>}</div>

          {sessionUser && user && sessionUser.id === user?.id ? <div className="flx gap-15p">
            <button onClick={()=>setEditComment(!editComment)}
              className="border-0p color-main-gray bg-white color-main-blue-hover">
                <i className="fas fa-edit"></i> <span>Edit</span>
            </button>
            <OpenModalButton
                modalComponent={<DeleteModal commentId={comment.id}/>}
                buttonText={<span><i className="fas fa-trash-alt"></i> Delete </span>}
                customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
          </div> : null}
        </div>
        {editComment ? <CommentInput setEdit={setEditComment} comment={comment} formType="edit" />
          : <p className="fontS-115rem">{comment.content}</p>}
      </div>
    </div>
  )
}

export default CommentCard
