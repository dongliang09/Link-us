// ========== Constants ================
const SET_ALL_COMMENTS = 'comments/SETALLCOMMENTS';

// ========== Dispatch Action ============
const setAllComments = (comments) => ({
	type: SET_ALL_COMMENTS,
  payload: comments
});

// ========== Thunk Action Creator=======
export const thunkGetAllComments = () =>  async (dispatch) => {
  const response = await fetch('/api/comments')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllComments(data.comments))
  }
}

// export const thunkCreateNewPost = (postData) =>  async (dispatch) => {
//   const response = await fetch('/api/posts', {
//     method: 'POST',
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(postData)
//   })
//   if (response.ok) {
//     // const data = await response.json()

//     // dispatch a thunk action
//     // because we want to see the latest posts from other users as well
//     // if we are taking too long to create a new post
//     await dispatch(thunkGetAllPosts())
//   }
// }

// export const thunkUpdatePost = (postId, postData) =>  async (dispatch) => {
//   const response = await fetch(`/api/posts/${postId}`, {
//     method: 'PUT',
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(postData)
//   })
//   if (response.ok) {
//     // const data = await response.json()
//     await dispatch(thunkGetAllPosts())
//   }
// }

// export const thunkDeletePost = (postId) =>  async (dispatch) => {
//   const response = await fetch(`/api/posts/${postId}`, {
//     method: 'DELETE',
//   })
//   if (response.ok) {
//     // const data = await response.json()
//     await dispatch(thunkGetAllPosts())
//   }
// }

// =========== Reducer =================
const initialState = { allComments: {} };

const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_COMMENTS:
      newState = {...state};
      newState.allComments = normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default commentReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
