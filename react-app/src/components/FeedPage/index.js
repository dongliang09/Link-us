import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { thunkGetAllPosts } from "../../store/post";
import { thunkGetAllUsers } from "../../store/user";
import { thunkGetAllComments } from "../../store/comment";
import { thunkGetAllLikes } from "../../store/like";
import PostCard from "./postCard";
import PostInputSelection from "./postInputSelection";
import FeedLeftPanel from "./feedLeftPanel";
import FeedRightPanel from "./feedRightPanel";

function FeedPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allPosts = Object.values(useSelector((state) => state.posts.allPosts))
    .sort((a,b)=>( new Date(b.created_at) - new Date(a.created_at)));
  const allComments = Object.values(useSelector((state) => state.comments.allComments));
  const allUsers = useSelector((state) => state.users.allUsers);
  const allLikes = Object.values(useSelector((state) => state.likes.allLikes));

  useEffect( ()=> {
    dispatch(thunkGetAllPosts())
    dispatch(thunkGetAllUsers())
    dispatch(thunkGetAllComments())
    dispatch(thunkGetAllLikes())
  }, [dispatch])

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="bg-gray pad-t-150rem">
      <div className="grid-1-5-1 gap-15p width-max-1100p mrg-lr-auto">
        <FeedLeftPanel currentUser={sessionUser}/>
        <div>
          <div className="mrg-b-15p">
            <PostInputSelection user={sessionUser}/>
          </div>
          {allPosts.map((aPost)=>{
            const relatedComments = allComments.filter(element => aPost.id === element.post_id)
            const relatedLikes = allLikes.filter(element =>aPost.id === element.post_id)
            return (
              <div key={aPost.id}>
                <PostCard post={aPost} user={allUsers[aPost.user_id]} key={aPost.id}
                  relatedComments={relatedComments} relatedLikes={relatedLikes}/>
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
