import React, { useState } from "react";

function PostInput() {
  const [postInput, setPostInput] = useState("");

  return (
    <div>
      <form >
        <input value={postInput} onChange={(e)=>setPostInput(e.target.value)}
          placeholder="What is your thought now?"/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default PostInput
