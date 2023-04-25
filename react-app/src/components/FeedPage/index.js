import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";
import { thunkGetAllUsers } from "../../store/user";
import { thunkGetAllComments } from "../../store/comment"
import PostCard from "./postCard";
import PostInputSelection from "./postInputSelection";
import FeedRightPanel from "./feedRightPanel";

function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = Object.values(useSelector((state) => state.posts.allPosts)).sort((a,b)=>( new Date(b.created_at) - new Date(a.created_at)));
  const allComments = Object.values(useSelector((state) => state.comments.allComments));
  const allUsers = useSelector((state) => state.users.allUsers);

  useEffect( ()=> {
    dispatch(thunkGetAllPosts())
    dispatch(thunkGetAllUsers())
    dispatch(thunkGetAllComments())
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="bg-gray pad-t-150rem">
      <div className="grid-1-5-1 gap-15p width-max-1100p mrg-lr-auto">
        <div className="fontS-400rem"><i className="fas fa-user-circle"></i></div>
        <div>
          <div className="mrg-b-15p">
            <PostInputSelection user={sessionUser}/>
          </div>
          {allPosts.map((aPost)=>{
            const relatedComments = allComments.filter(element => aPost.id === element.post_id)
            return (
              <div key={aPost.id}>
                <PostCard post={aPost} user={allUsers[aPost.user_id]} relatedComments={relatedComments} key={aPost.id}/>
              </div>
            )
          }
          )}
        </div>
        <FeedRightPanel />
      </div>
    </div>
  )
}

export default FeedPage;
