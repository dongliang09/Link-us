// ========== Constants ================
const SET_ALL_LIKES = 'likes/SETALLLIKES';

// ========== Dispatch Action ============
const setAllLikes = (likes) => ({
	type: SET_ALL_LIKES,
  payload: likes
});

// ========== Thunk Action Creator=======
export const thunkGetAllLikes = () =>  async (dispatch) => {
  const response = await fetch('/api/likes')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllLikes(data.likes))
  }
}

export const thunkCreateNewLike = (postId, likeData) =>  async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/likes`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(likeData)
  })
  if (response.ok) {
    await dispatch(thunkGetAllLikes())
  }
}



// =========== Reducer =================
const initialState = { allLikes: {} };

const likeReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_LIKES:
      newState = {...state};
      newState.allLikes= normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default likeReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
