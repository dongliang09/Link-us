import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeletePost } from "../../store/post";

function DeletePostModal({postId}) {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const { closeModal } = useModal();

  const handleDelete = async (postId) => {
    await dispatch(thunkDeletePost(postId))
    closeModal()
  }

  return (
    <div>
      <h1>Delete Post?</h1>
      <p>Are you sure you want to permanently remove this post?</p>
      <div>
        <button onClick={()=>{handleDelete(postId)}}>
          Delete
        </button>
        <button onClick={()=>closeModal()}>Cancel</button>
      </div>
    </div>
  )
}

export default DeletePostModal
