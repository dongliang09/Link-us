import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";
import { thunkGetAllUsers } from "../../store/user";
import PostCard from "./postCard";
import PostInput from "./postInput";

function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = Object.values(useSelector((state) => state.posts.allPosts));
  const allUsers = useSelector((state) => state.users.allUsers);
  const history = useHistory();

  useEffect( ()=> {
    dispatch(thunkGetAllPosts())
    dispatch(thunkGetAllUsers())
  }, [dispatch])

  // if (sessionUser) return <Redirect to="/" />;

  return (
    <div className="grid-1-5-1">
      <div>Left profile</div>
      <div>
        <PostInput />
        <h1>all the posts</h1>
        {allPosts.map((aPost)=><PostCard post={aPost} user={allUsers[aPost.user_id]} key={aPost.id}/>)}
      </div>
      <div>right panel</div>
    </div>
  )
}

export default FeedPage;
