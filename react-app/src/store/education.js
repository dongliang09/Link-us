// ========== Constants ================
const SET_ALL_EDUCATIONS = 'educations/SETALLEDUCATIONS';

// ========== Dispatch Action ============
const setAllEductions = (educations) => ({
	type: SET_ALL_EDUCATIONS,
  payload: educations
});

// ========== Thunk Action Creator=======
export const thunkGetAllEducations = () =>  async (dispatch) => {
  const response = await fetch('/api/educations')
  if (response.ok) {
    const data = await response.json()
    dispatch(setAllEductions(data.educations))
  }
}

export const thunkCreateNewEducation = (EducationData) =>  async (dispatch) => {
  const response = await fetch('/api/educations', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(EducationData)
  })
  if (response.ok) {
    await dispatch(thunkGetAllEducations())
  }
}


// =========== Reducer =================
const initialState = { allEducations: {} };

const educationReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case SET_ALL_EDUCATIONS:
      newState = {...state};
      newState.allEducations= normalizeData(action.payload)
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
