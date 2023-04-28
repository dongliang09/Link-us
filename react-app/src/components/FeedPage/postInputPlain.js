import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateNewPost, thunkUpdatePost } from "../../store/post";

function PostInputPlain({formType, post}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [postInput, setPostInput] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { closeModal } = useModal();

  async function checkInputError(e) {
    e.preventDefault();
    if (Object.values(error).length === 0) {
      if (formType === "create") {
        await dispatch(thunkCreateNewPost({content:postInput}))
      } else {
        await dispatch(thunkUpdatePost(post.id, {content:postInput}))
      }
      closeModal()
    } else {
      setSubmitted(true)
    }
  }

  useEffect(()=> {
    // populate the post info on first render
    if (formType === "edit") {
      setPostInput(post.content)
    }
    return (() => {
      setError({});
      setPostInput("")
    })
  },[]);

  useEffect(()=>{
    let error = {}
    if (postInput.length > 255) error.postInput = "Post only accepts maximum of 255 characters"
    setError(error)
  },[postInput]);

  return (
    <div className="pad-15p">
      <div className="flx-jc-sb">
        {sessionUser.firstName}
        <button onClick={()=>closeModal()} className="fontS-115rem bg-gray-hover border-0p borderR-50per bg-white">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <ul>
        {submitted && Object.values(error).map((error, idx) => (
          <li key={idx} className='color-red'>{error}</li>
        ))}
      </ul>

      <form onSubmit={(e)=>checkInputError(e)} className="flx-col">
        <textarea value={postInput} onChange={(e)=>setPostInput(e.target.value)} required
          placeholder="What is your thought now?"
          cols="40" rows="5"
          className="mrg-tb-15p fontS-115rem borderR-5p"/>
        <button className="width-fit pad-tb-10p pad-lr-150rem border-0p borderR-15p bg-main-blue-hover color-white-hover">
          {formType === "create" ? "Post" : "Save"}
        </button>
      </form>
    </div>
  )
}

export default PostInputPlain
