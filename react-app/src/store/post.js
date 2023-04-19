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
  // console.log("fetch")
  const response = await fetch('/api/posts')
  // console.log(response)
  if (response.ok) {
    const data = await response.json()
    // console.log(data)
    dispatch(setAllPosts(data.posts))
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
