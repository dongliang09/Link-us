import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateNewComment, thunkUpdateComment } from "../../store/comment";

function CommentInput({ postId, comment, formType, setEdit}) {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});

  async function checkInputError(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      if (formType === "create") {
        await dispatch(thunkCreateNewComment(postId, {content:commentInput}))
        setCommentInput("")
      } else {
        await dispatch(thunkUpdateComment(comment.id, {content:commentInput}))
        setEdit(false)
      }
    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=>{
    if (formType === 'edit') {
      setCommentInput(comment.content)
    }
    return (() => {
      setError({});
      setCommentInput("")
    })
  },[])

  useEffect(()=>{
    let error = {}
    if (commentInput.length > 255) error.commentInput = "comment only accepts maximum of 255 characters"
    setError(error)
  },[commentInput]);

  return (
    <div className="mrg-10p">

      <form onSubmit={(e)=>checkInputError(e)}>
        <input value={commentInput} onChange={(e)=>setCommentInput(e.target.value)} required
          placeholder="Add a comment ..."
          className="fontS-115rem borderR-15p pad-tb-5p pad-lr-10p"/>
        {commentInput.length > 0 && <button className="width-fit pad-tb-10p pad-lr-150rem border-0p borderR-15p bg-main-blue bg-deep-blue-hover color-white mrg-l-10p">
          {formType === "create" ? "Post" : "Save"}
        </button>}
        {formType === "edit" && <button type="button" onClick={()=>setEdit(false)}
          className="width-fit pad-10p border-main-gray borderR-15p mrg-l-10p">
          Cancel
        </button>}
      </form>
      <ul>
        {submitted && Object.values(error).map((error, idx) => (
          <li key={idx} className='color-red'>{error}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentInput
