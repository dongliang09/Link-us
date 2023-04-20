import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";
import PostCard from "./postCard";
import PostInput from "./postInput";

function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = Object.values(useSelector((state) => state.posts.allPosts));

  console.log(allPosts)

  useEffect( ()=> {
    console.log("useEffect")
    dispatch(thunkGetAllPosts())
    console.log("useEffect2")
  }, [dispatch])

  // if (sessionUser) return <Redirect to="/" />;

  return (
    <div className="grid-1-5-1">
      <div>Left profile</div>
      <div>
        <PostInput />
        <h1>all the posts</h1>
        {allPosts.map((element)=><PostCard post={element} key={element.id}/>)}
      </div>
      <div>right panel</div>
    </div>
  )
}

export default FeedPage;
