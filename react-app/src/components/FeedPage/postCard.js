import React from "react";

function PostCard({post, user}) {
  return (
    <div className="border-red">
      <p>"user": {user?user.firstName:null} {user?user.lastName:null}</p>
      <p>"post content":{post.content}</p>
    </div>
  )
}

export default PostCard
