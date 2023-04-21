import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateNewComment, thunkUpdateComment } from "../../store/comment";

function CommentInput({ postId, comment, formType, setEdit}) {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  // const [error, setError] = useState({});

  async function checkInputError(e) {
    e.preventDefault();
    if (formType === "create") {
      await dispatch(thunkCreateNewComment(postId, {content:commentInput}))
    } else {
      await dispatch(thunkUpdateComment(comment.id, {content:commentInput}))
      setEdit(false)
    }
  }

  useEffect(()=>{
    if (formType === 'edit') {
      setCommentInput(comment.content)
    }
  },[])

  return (
    <div className="">
      <form onSubmit={(e)=>checkInputError(e)}>
        <input value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} required
          placeholder="Add a comment ..."/>
        {commentInput.length > 0 && <button> {formType === "create" ? "Post" : "Save"} </button>}
      </form>
      {formType === "edit" && <button onClick={()=>setEdit(false)}>Cancel</button>}
    </div>
  )
}

export default CommentInput
