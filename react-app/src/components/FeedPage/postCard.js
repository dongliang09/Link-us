import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewLike, thunkDeleteLike } from "../../store/like";
import OpenModalButton from "../OpenModalButton";
import PostInputPlain from "./postInputPlain";
import DeleteModal from "./deleteModal";
import CommentCard from "./commentCard";
import CommentInput from "./commentInput";

function PostCard({post, user, relatedComments, relatedLikes}) {
  // post contains the info of single post
  // user is the owner of the post
  // relatedComments are comments for this single post
  // relatedLikes are likes for this single post

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.users.allUsers);
  const [seeComment, setSeeComment] = useState(false);
  const history = useHistory();

  let isCurrentUserLikesThisPost = false;
  let userLikeInfo;
  for(let i = 0; i < relatedLikes.length; i++) {
    if (relatedLikes[i].user_id == sessionUser.id) {
      isCurrentUserLikesThisPost = true;
      userLikeInfo = relatedLikes[i]
    }
  }

  // dafault profile pic to be light blue for other users, black for current user
  let profileColor = (post.user_id === sessionUser?.id ? "" : "color-second-blue") + " fas fa-user-circle fontS-300rem";

  async function toggleLike() {
    if (isCurrentUserLikesThisPost) {
      await dispatch(thunkDeleteLike(userLikeInfo.id))
    } else {
      await dispatch(thunkCreateNewLike(post.id, {}))
    }
  }

  return (
    <div className="bg-white pad-15p borderR-10p boxS-0-0-2-gray mrg-tb-15p">

      <div className="flx-jc-sb">
        <div className="flx gap-15p cursor-pt-hover " onClick={()=>history.push(`/user/${post.user_id}`)}>
          <i className={profileColor}></i>
          <div className="mrg-tb-auto txt-decor-underL-hover">
            {user?user.firstName:null} {user?user.lastName:null}
          </div>
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

      <p className="fontS-115rem pad-l-13p width-max-700p overFW-bw hgt-max-200p overF-auto">
        {post.content}
      </p>

      {post.image ? <img src={post.image} alt="post image"
        className="width-max-700p pad-lr-15p borderR-5per"/> : null}

      <div className="flx-jc-sb mrg-tb-10p mrg-lr-15p">
        <div className="color-main-gray">
          {relatedLikes.length === 0 ? "" :
            relatedLikes.length+" "+(relatedLikes.length > 1 ? "likes" : "like")}
        </div>
        <div className="color-main-gray">{relatedComments.length} comments</div>
      </div>

      <hr className="color-main-gray"/>

      <div className="flx-jc-sa">
        <button onClick={()=>toggleLike()}
          className={"bg-white border-0p color-main-blue-hover fontS-105rem " + (isCurrentUserLikesThisPost ? "color-main-blue" : "color-main-gray")} >
          <i className={isCurrentUserLikesThisPost ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i> Like
        </button>
        <button onClick={()=>setSeeComment(!seeComment)}
          className="color-main-gray bg-white border-0p color-main-blue-hover fontS-105rem" >
          <i className="far fa-comment-alt"></i> Comment
        </button>
      </div>

      { seeComment && <div>

        <div  className="flx mrg-15p grid-1-10">
          <div>
            <i className={profileColor}></i>
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
