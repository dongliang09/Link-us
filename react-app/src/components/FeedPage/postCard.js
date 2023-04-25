import React, { useState } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import PostInputPlain from "./postInputPlain";
import DeleteModal from "./deleteModal";
import CommentCard from "./commentCard";
import CommentInput from "./commentInput";

function PostCard({post, user, relatedComments}) {
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.users.allUsers);
  const [seeComment, setSeeComment] = useState(false);

  return (
    <div className="bg-white pad-15p borderR-10p boxS-0-0-2-gray mrg-tb-15p">

      <div className="flx-jc-sb">
        <div>
          <i className="fas fa-user-circle fontS-300rem color-second-blue"></i> {user?user.firstName:null} {user?user.lastName:null}
        </div>
        {sessionUser && user && sessionUser.id === user.id ? <div className="flx gap-15p">
            <OpenModalButton
              modalComponent={<PostInputPlain formType={"edit"} post={post}/>}
              buttonText={<span><i className="fas fa-edit"></i> Update </span>}
              customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
            <OpenModalButton
              modalComponent={<DeleteModal postId={post.id}/>}
              buttonText={<span><i className="fas fa-trash-alt"></i> Delete </span>}
              customizeStyle="border-0p color-main-gray bg-white color-main-blue-hover"/>
        </div> : null}
      </div>

      <p className="fontS-115rem pad-l-13p">{post.content}</p>

      <div className="color-main-gray flx-jc-fe">{relatedComments.length} comments</div>

      <hr className="color-main-gray"/>

      <div className="flx-jc-sa">
        <button onClick={()=>alert("feature coming soon")}
          className="color-main-gray bg-white border-0p color-main-blue-hover" >
          <i class="far fa-thumbs-up"></i> Like
        </button>
        <button onClick={()=>setSeeComment(!seeComment)}
          className="color-main-gray bg-white border-0p color-main-blue-hover" >
          <i class="far fa-comment-alt"></i> Comment
        </button>
      </div>

      { seeComment && <div>

        <div  className="border-green mrg-15p">
          <div>
            {sessionUser?.firstName}
          </div>
          <CommentInput postId={post.id} formType="create"/>
        </div>

        {relatedComments.map(comment =>
          <CommentCard comment={comment} postOwner={allUsers[post.user_id]}
            user={allUsers[comment.user_id]} key={comment.id} />)}

      </div>}

    </div>
  )
}

export default PostCard
