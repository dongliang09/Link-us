import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateNewPost, thunkUpdatePost } from "../../store/post";

function PostInputPlain({formType, post}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [postInput, setPostInput] = useState("");
  // const [error, setError] = useState({});
  const { closeModal } = useModal();

  async function checkInputError(e) {
    e.preventDefault();
    if (formType === "create") {
      await dispatch(thunkCreateNewPost({content:postInput}))
    } else {
      await dispatch(thunkUpdatePost(post.id, {content:postInput}))
    }
    closeModal()
  }

  useEffect(()=> {
    // populate the post info on first render
    if (formType === "edit") {
      setPostInput(post.content)
    }
  },[])

  return (
    <div>
      <div>
        {sessionUser.firstName}
        <button onClick={()=>closeModal()}><i className="fas fa-times"></i></button>
      </div>
      <form onSubmit={(e)=>checkInputError(e)}>
        <input value={postInput} onChange={(e)=>setPostInput(e.target.value)} required
          placeholder="What is your thought now?"/>
        {formType === "create" ? <button>Post</button> : <button>Save</button>}
      </form>
    </div>
  )
}

export default PostInputPlain
