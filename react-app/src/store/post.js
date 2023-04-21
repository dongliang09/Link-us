// ========== Constants ================
const SET_ALL_POST = 'posts/SETALLPOST';
// const CREATE_POST = 'posts/CREATEPOST';
// const UPDATE_POST = 'posts/UPDATEPOST';
// const DELETE_POST = 'posts/DELETEPOST';

// ========== Dispatch Action ============
const setAllPosts = (posts) => ({
	type: SET_ALL_POST,
  payload: posts
});

// const createPost = (post) => ({
// 	type: CREATE_POST,
//   payload: post
// });

// ========== Thunk Action Creator=======
export const thunkGetAllPosts = () =>  async (dispatch) => {
  const response = await fetch('/api/posts')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllPosts(data.posts))
  }
}

export const thunkCreateNewPost = (postData) =>  async (dispatch) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postData)
  })
  if (response.ok) {
    // const data = await response.json()

    // dispatch a thunk action
    // because we want to see the latest posts from other users as well
    // if we are taking too long to create a new post
    await dispatch(thunkGetAllPosts())
  }
}

export const thunkUpdatePost = (postId, postData) =>  async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postData)
  })
  if (response.ok) {
    // const data = await response.json()
    await dispatch(thunkGetAllPosts())
  }
}

export const thunkDeletePost = (postId) =>  async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  })
  if (response.ok) {
    // const data = await response.json()
    await dispatch(thunkGetAllPosts())
  }
}

// =========== Reducer =================
const initialState = { allPosts: {}, singlePost: {} };

const postReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_POST:
      newState = {...state};
      newState.allPosts = normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default postReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
