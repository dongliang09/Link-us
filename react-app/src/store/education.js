// ========== Constants ================
const SET_ALL_EDUCATIONS = 'educations/SETALLEDUCATIONS';

// ========== Dispatch Action ============
const setAllComments = (educations) => ({
	type: SET_ALL_EDUCATIONS,
  payload: educations
});

// ========== Thunk Action Creator=======
export const thunkGetAllEducations = () =>  async (dispatch) => {
  const response = await fetch('/api/educations')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllComments(data.educations))
  }
}


// =========== Reducer =================
const initialState = { allEducation: {} };

const educationReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_EDUCATIONS:
      newState = {...state};
      newState.allComments = normalizeData(action.payload)
      return newState
    default:
      return state
  }
}

export default educationReducer;

function normalizeData(dataArr) {
  let newObj = {};
  dataArr.forEach(element => {
    newObj[element.id] = element;
  })
  return newObj
}
