// ========== Constants ================
const SET_ALL_USERS = 'posts/SETALLUSERS';

// ========== Dispatch Action ============
const setAllUsers = (users) => ({
	type: SET_ALL_USERS,
  payload: users
});

// ========== Thunk Action Creator=======
export const thunkGetAllUsers = () =>  async (dispatch) => {
  // currently fetching all users,
  // could potentially fetch a new route,
  // which filters the users in the following list
  const response = await fetch('/api/users/')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllUsers(data.users))
  }
}

// =========== Reducer =================
const initialState = { allUsers: {} };

const userReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_USERS:
      newState = {...state};
      newState.allUsers = normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default userReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
