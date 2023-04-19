import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";

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
    <div>
      Feed Page component
      {allPosts.map((element)=><div>{element.content}</div>)}
    </div>
  )
}

export default FeedPage;
