import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateNewPost, thunkUpdatePost } from "../../store/post";
import LoadingCircle from "../reusableComponents/Loading";

function PostInputPlain({formType, post}) {
  // formType can be "create" or "edit"
  // post is only passed down to here when the formType is "edit"

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [postInput, setPostInput] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false)
  const { closeModal } = useModal();

  async function checkInputError(e) {
    e.preventDefault();
    setLoading(true)
    if (Object.values(error).length === 0) {
      const formData = new FormData();
      formData.append("content", postInput);
      formData.append("image", postImage)
      if (formType === "create") {
        await dispatch(thunkCreateNewPost(formData))
      } else {
        await dispatch(thunkUpdatePost(post.id, {content:postInput}))
      }
      closeModal()
    } else {
      setSubmitted(true)
    }
    setLoading(false)
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

      <form onSubmit={(e)=>checkInputError(e)} className="flx-col"
        encType="multipart/form-data">
        <textarea value={postInput} onChange={(e)=>setPostInput(e.target.value)} required
          placeholder="What is your thought now?"
          cols="40" rows="5"
          className="mrg-tb-5p fontS-115rem borderR-5p"/>
        {formType === "create" ? <div className="flx">
          <i className="fas fa-camera mrg-tb-auto"></i>
          <label for="postImageUpload" id="postImgUploadLabel" className="cursor-pt-hover mrg-tb-10p pad-lr-10p color-main-blue-hover">
            Upload your post image
          </label>
        </div> :null }
        {formType === "create" ? <input type="file" accept="image/*" id="postImageUpload"
          onChange={(e) => {
            setPostImage(e.target.files[0])
            document.querySelector("#postImgUploadLabel").innerText = e.target.files[0].name
          }}
          className="dis-none"/> : null}
        <div className="flx gap-20p">
          <button className="width-fit pad-tb-10p pad-lr-150rem border-0p borderR-15p bg-main-blue-hover color-white-hover">
            {formType === "create" ? "Post" : "Save"}
          </button>
          {loading ? <LoadingCircle /> : null}
        </div>
      </form>
    </div>
  )
}

export default PostInputPlain
