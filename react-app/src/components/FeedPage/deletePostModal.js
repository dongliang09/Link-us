import React from "react";
import { useModal } from "../../context/Modal";

function DeletePostModal() {
  const { closeModal } = useModal();

  return (
    <div>
      <h1>Delete Post?</h1>
      <p>Are you sure you want to permanently remove this post?</p>
      <div>
        <button>Delete</button>
        <button onClick={()=>closeModal()}>Cancel</button>
      </div>
    </div>
  )
}

export default DeletePostModal
