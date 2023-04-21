import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewComment } from "../../store/comment";

function CommentInput({ postId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [commentInput, setCommentInput] = useState("");
  // const [error, setError] = useState({});

  async function checkInputError(e) {
    e.preventDefault();
      await dispatch(thunkCreateNewComment(postId,{content:commentInput}))
  }

  return (
    <div className="border-green mrg-15p">
      <div>
        {sessionUser.firstName}
      </div>
      <form onSubmit={(e)=>checkInputError(e)}>
        <input value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} required
          placeholder="Add a comment ..."/>
        {commentInput.length > 0 && <button>Post</button>}
      </form>
    </div>
  )
}

export default CommentInput
