import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";
import { thunkGetAllUsers } from "../../store/user";
import { thunkGetAllComments } from "../../store/comment"
import PostCard from "./postCard";
import PostInputSelection from "./postInputSelection";
import CommentCard from "./commentCard";
import CommentInput from "./commentInput";

function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = Object.values(useSelector((state) => state.posts.allPosts)).sort((a,b)=>( new Date(b.created_at) - new Date(a.created_at)));
  const allComments = Object.values(useSelector((state) => state.comments.allComments));
  const allUsers = useSelector((state) => state.users.allUsers);
  const history = useHistory();

  console.log(allComments)

  useEffect( ()=> {
    dispatch(thunkGetAllPosts())
    dispatch(thunkGetAllUsers())
    dispatch(thunkGetAllComments())
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="grid-1-5-1 bg-gray pad-t-150rem">
      <div>Left profile</div>
      <div>
        <div>
          <PostInputSelection user={sessionUser}/>
        </div>
        <h1>all the posts</h1>
        {allPosts.map((aPost)=>{
          const relatedComments = allComments.filter(element => aPost.id === element.post_id)
          return (
            <div key={aPost.id}>
              <PostCard post={aPost} user={allUsers[aPost.user_id]} key={aPost.id}/>
              <div  className="border-green mrg-15p">
                <div>
                  {sessionUser?.firstName}
                </div>
                <CommentInput postId={aPost.id} formType="create"/>
              </div>
              {relatedComments.map(comment => <CommentCard comment={comment} postOwner={allUsers[aPost.user_id]} user={allUsers[comment.user_id]} key={comment.id} />)}
            </div>
          )
        }
        )}
      </div>
      <div>
        <h3>Link-us News</h3>
        <h4>Coming Features</h4>
        <ul>
          <li>Education</li>
          <li>Skills</li>
          <li>Following</li>
          <li>Search</li>
        </ul>
      </div>
    </div>
  )
}

export default FeedPage;
