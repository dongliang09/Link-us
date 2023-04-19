import React, { useEffect, useState } from "react";

function PostCard({post}) {
  return (
    <div className="border-red">
      <p>"user":{post.user_id}</p>
      <p>
        "post content":{post.content}
      </p>
    </div>
  )
}

export default PostCard
